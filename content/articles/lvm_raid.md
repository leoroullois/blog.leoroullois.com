---
title: Beginner introduction to linux LVM and RAID.
description: With the linux LVM service, you will learn how to expand partitions, make snapshots, add volumes etc. The features are illustrated with practical examples. You will then set up a software RAID and simulate the loss/recovery of one of the volumes in your RAID.
author: Leyo
date: 5/11/2022
tags: linux
---

- [1. LVM (Logical Volume Manager)](#1-lvm-logical-volume-manager)
  - [1.1. Introduction](#11-introduction)
  - [1.2. Definitions](#12-definitions)
  - [1.3. 1.3 Physical Volumes (PV)](#13-13-physical-volumes-pv)
  - [1.4. Volume Groups (VG)](#14-volume-groups-vg)
    - [1.4.1. Creating and listing VGs](#141-creating-and-listing-vgs)
    - [1.4.2. Extending and reducing a VG](#142-extending-and-reducing-a-vg)
    - [1.4.3. Delete a VG](#143-delete-a-vg)
  - [1.5. Logical Volumes (LV)](#15-logical-volumes-lv)
    - [1.5.1. Creating a LV](#151-creating-a-lv)
    - [1.5.2. Operations on LV](#152-operations-on-lv)
    - [1.5.3. Resize (extend or reduce) a LV](#153-resize-extend-or-reduce-a-lv)
  - [1.6. Snapshot and restoration](#16-snapshot-and-restoration)
- [2. RAID](#2-raid)
  - [2.1. What is a RAID ?](#21-what-is-a-raid-)
  - [2.2. Deep dive into RAID 1](#22-deep-dive-into-raid-1)
    - [2.2.1. Creation](#221-creation)
    - [2.2.2. Recovering](#222-recovering)

## 1. LVM (Logical Volume Manager)

### 1.1. Introduction

Create and handle logical volumes in linux.
It is used for replacement of partitioning.
It is very smooth compare to partitioning, for example we can reduce a file system for extend an another, whatever the position on the disk of these file systems.

Redimensionning without risk with LVM.

If one of the physical volume is dead, it's all the logical volumes in this physical volume which are dead.
That's why we need to use LVM with RAID.

### 1.2. Definitions

| Name | Full name       | Description                                                                                                           |
| ---- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| PV   | Physical volume | Hard disk, partitions, RAID volume, SAN                                                                               |
| VG   | Volume Group    | One or more VG                                                                                                        |
| LV   | Logical Volumes | LV are cut into VG, then formatted and mounted in a file system. LV are like partitions                               |
| FS   | File system     | This is a way to store information and store them in files. They have a mounted point (like /) and a type (like ext4) |

```
  vagrant@lvm:~$ lsblk
  NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
  loop0    7:0    0 63.2M  1 loop /snap/core20/1634
  loop1    7:1    0   48M  1 loop /snap/snapd/17336
  loop2    7:2    0 67.8M  1 loop /snap/lxd/22753
  sda      8:0    0   40G  0 disk
  └─sda1   8:1    0   40G  0 part /
  sdb      8:16   0   10M  0 disk
  sdc      8:32   0    5G  0 disk
  sdd      8:48   0    5G  0 disk
  ├─sdd1   8:49   0  2.5G  0 part
  └─sdd2   8:50   0  2.5G  0 part
  sde      8:64   0    5G  0 disk
```

### 1.3. 1.3 Physical Volumes (PV)

3 disks of 5Gio(sdc, sdd, sde), 2 partitions on sdd (sdd1, sdd2) created from :

```bash
sudo fdisk /dev/sdd
```

On peut créer des PV : 
```bash
sudo pvcreate /dev/sdd1 /dev/sdd2
```

Then, we can list all physical volumes with ``sudo pvscan`` :

```
  PV /dev/sdc                       lvm2 [5.00 GiB]
  PV /dev/sdd1                      lvm2 [<2.50 GiB]
  PV /dev/sdd2                      lvm2 [2.50 GiB]
  Total: 3 [<10.00 GiB] / in use: 0 [0   ] / in no VG: 3 [<10.00 GiB]
```

Others commands to get informations about PVs :
- ``sudo pvs`` :
```
  PV         VG Fmt  Attr PSize  PFree
  /dev/sdc      lvm2 ---   5.00g  5.00g
  /dev/sdd1     lvm2 ---  <2.50g <2.50g
  /dev/sdd2     lvm2 ---   2.50g  2.50g
```
- ``sudo pvdisplay`` :
```
  "/dev/sdc" is a new physical volume of "5.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdc
  VG Name
  PV Size               5.00 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               DQOjmZ-oQhB-9O5D-0Pki-bKI0-8RT7-yUOYjd

  "/dev/sdd1" is a new physical volume of "<2.50 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdd1
  VG Name
  PV Size               <2.50 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               XiZDy3-JXz6-clD1-Sh6Q-KaB5-6ns3-NnmRqe

  "/dev/sdd2" is a new physical volume of "2.50 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdd2
  VG Name
  PV Size               2.50 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               Busc3l-tnRF-oZY1-potg-tlxt-OC1t-0ZIcH1
```

If you want to delete a PV, it is possible with the command ``pvremove`` just like ``pvcreate``.
Here is an example :

```bash
sudo pvremove /dev/sdd2
```

Output :

```
  Labels on physical volume "/dev/sdd2" successfully wiped.
```

Here is the confirmation :

```
vagrant@lvm:~$ sudo pvs
  PV         VG Fmt  Attr PSize  PFree
  /dev/sdc      lvm2 ---   5.00g  5.00g
  /dev/sdd1     lvm2 ---  <2.50g <2.50g
```

Now, I can recreate the PV with the following command : 
```bash
  sudo pvcreate /dev/sdd2
```

### 1.4. Volume Groups (VG)

#### 1.4.1. Creating and listing VGs

I can create a volume group that includes the PV ``/dev/sdc`` and ``/dev/sdd1`` with this command :
```
vagrant@lvm:~$ sudo vgcreate lvm_tutorial /dev/sdc /dev/sdd1
  Volume group "lvm_tutorial" successfully created
```

Now, if I list all the created VG with the command ``sudo vgs``, I have this output :
```
  VG           #PV #LV #SN Attr   VSize VFree
  lvm_tutorial   2   0   0 wz--n- 7.49g 7.49g
```

The VG **lvm_tutorial** appear, so our VG is now created.

> Just like for PV, you can use other commands to list all your VG : ``vgdisplay``, ``vgscan``. I let you test these commands.

With the previous commands, you can't see which PV was used to create this new VG. If you want to get this information, you can run this command :
```bash
sudo pvdisplay -S vgname=<your_vg_name>
```

For example, to list all the PV linked to our VG **lvm_tutorial** :
```bash
sudo pvdisplay -S vgname=lvm_tutorial
```

Output :
```
  --- Physical volume ---
  PV Name               /dev/sdc
  VG Name               lvm_tutorial
  PV Size               5.00 GiB / not usable 4.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              1279
  Free PE               1279
  Allocated PE          0
  PV UUID               DQOjmZ-oQhB-9O5D-0Pki-bKI0-8RT7-yUOYjd

  --- Physical volume ---
  PV Name               /dev/sdd1
  VG Name               lvm_tutorial
  PV Size               <2.50 GiB / not usable 3.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              639
  Free PE               639
  Allocated PE          0
  PV UUID               XiZDy3-JXz6-clD1-Sh6Q-KaB5-6ns3-NnmRqe
```

#### 1.4.2. Extending and reducing a VG

Extending a volume group is the action of adding a new physical volume to our VG.
With our previous manipulations we have one volume group named **lvm_tutorial** created from ``/dev/sdc`` and ``/dev/sdd1``.
Let's extend this VG with the partition ``/dev/sdd2``.
To do this, we are going to use the command above :

```bash
sudo vgextend lvm_tutorial /dev/sdd2
```

It will produce the following output :
```
  Volume group "lvm_tutorial" successfully extended
```

We can take a look about the current state :

```
vagrant@lvm:~$ sudo pvdisplay -S vgname=lvm_tutorial
  --- Physical volume ---
  PV Name               /dev/sdc
  VG Name               lvm_tutorial
  PV Size               5.00 GiB / not usable 4.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              1279
  Free PE               1279
  Allocated PE          0
  PV UUID               DQOjmZ-oQhB-9O5D-0Pki-bKI0-8RT7-yUOYjd

  --- Physical volume ---
  PV Name               /dev/sdd1
  VG Name               lvm_tutorial
  PV Size               <2.50 GiB / not usable 3.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              639
  Free PE               639
  Allocated PE          0
  PV UUID               XiZDy3-JXz6-clD1-Sh6Q-KaB5-6ns3-NnmRqe

  --- Physical volume ---
  PV Name               /dev/sdd2
  VG Name               lvm_tutorial
  PV Size               2.50 GiB / not usable 4.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              639
  Free PE               639
  Allocated PE          0
  PV UUID               c5Uvub-Rdlt-fckG-6WOo-wHlY-m2gO-ElrvkJ
```

You have guessed, you can reduce a VG just like this :
```bash
sudo vgreduce <vgname> <pv1> <pv2> ....
```

Try to remove the PV ``/dev/sdc`` and ``/dev/sdd1`` from the VG :

Answer :
```bash
sudo vgreduce lvm_tutorial /dev/sdc /dev/sdd1
```

Well played ! Now here we are :

```
vagrant@lvm:~$ sudo pvdisplay -S vgname=lvm_tutorial
  --- Physical volume ---
  PV Name               /dev/sdd2
  VG Name               lvm_tutorial
  PV Size               2.50 GiB / not usable 4.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              639
  Free PE               639
  Allocated PE          0
  PV UUID               c5Uvub-Rdlt-fckG-6WOo-wHlY-m2gO-ElrvkJ
```

I will add these to volumes back for the rest of this article.

```bash
sudo vgextend lvm_tutorial /dev/sdc /dev/sdd1
```

#### 1.4.3. Delete a VG

You can delete a VG like this :
```bash
sudo vgremove <vg_name>
```

**Don't run the following command if you want to read the rest of the article.**
> For example : ``sudo vgremove lvm_tutorial``.

### 1.5. Logical Volumes (LV)

Volumes groups are like your hard disks, and your logical volumes are like the partitions on these disks.
Indeed, you can format a LV with a file system of your choice and mount it wherever you want.

#### 1.5.1. Creating a LV

You can create a new logical volume like this :

```bash
sudo lvcreate -L <size> -n <lvname> <vgname>
```

- ``-L`` for the size of the LV. You can use **"GB"** **"MB"** and **"KB"**. For example ``2.5MB``.
- ``-n`` is for naming your new LV.

> When you create a new LV, make sure the VG from you are creating the LV has enough space.

For example, I created a new LV named lv1 :

```
vagrant@lvm:~$ sudo lvcreate -L 5GB -n lv1 lvm_tutorial
  Logical volume "lv1" created.
```


#### 1.5.2. Operations on LV

You can access your LV here : ``/dev/<vg_name>/<lv_name>``.

- For example :
```
vagrant@lvm:~$ ls -la /dev/lvm_tutorial/lv1
lrwxrwxrwx 1 root root 7 Nov  5 18:49 /dev/lvm_tutorial/lv1 -> ../dm-0
```

You can format it as **ext4** :
```bash
sudo mkfs.ext4 /dev/lvm_tutorial/lv1
```

- Output :
```
vagrant@lvm:~$ sudo mkfs.ext4 /dev/lvm_tutorial/lv1
mke2fs 1.45.5 (07-Jan-2020)
Creating filesystem with 1310720 4k blocks and 327680 inodes
Filesystem UUID: ded41ab1-3bef-47fd-9a4d-cec26287861e
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736

Allocating group tables: done
Writing inode tables: done
Creating journal (16384 blocks): done
Writing superblocks and filesystem accounting information: done
```

Now, you can mount it :

```bash
sudo mount -t ext4 /dev/lvm_tutorial/lv1 /mnt
```

#### 1.5.3. Resize (extend or reduce) a LV

You can resize a logical volume with the command ``lvresize``, ``lvextend`` or ``lvreduce``. Here is an example :

> You must check if the VG has enough free space if you want to extend your LV !

```bash
sudo lvresize -L +2GB lvm_tutorial/lv1
```

- Output :
```
  Size of logical volume lvm_tutorial/lv1 changed from 5.00 GiB (1280 extents) to 7.00 GiB (1792 extents).
  Logical volume lvm_tutorial/lv1 successfully resized.
```

Now, you have resized successfully your **LV**, then you need to update the filesystem. For **ext4**, the command are ``e2fsck`` and ``resize2fs`` :

```bash
sudo e2fsck -f /dev/lvm_tutorial/lv1
```

then :

```bash
sudo resize2fs /dev/lvm_tutorial/lv1
```

### 1.6. Snapshot and restoration

```bash
sudo lvcreate -s -n <snap_name> -L <size> <lv_name>
```

> Make sure the corresponding **VG** has enough space.

You can then mount the snapshot.

Let's mount our **LV** _lv1_ and create some files/directory into it :
```
vagrant@lvm:~$ sudo mkdir -p /mnt/lv1
vagrant@lvm:~$ sudo mount /dev/lvm_tutorial/lv1 /mnt/lv1
vagrant@lvm:~$ cd /mnt/lv1/
vagrant@lvm:/mnt/lv1$ ls
lost+found  test
vagrant@lvm:/mnt/lv1$ sudo touch file1 file2
vagrant@lvm:/mnt/lv1$ sudo mkdir dir1 dir2 dir3
```

Now, here is the state of our **LV** :

```
vagrant@lvm:/mnt/lv1$ ls -l
total 32
drwxr-xr-x 2 root root  4096 Nov  6 12:00 dir1
drwxr-xr-x 2 root root  4096 Nov  6 12:00 dir2
drwxr-xr-x 2 root root  4096 Nov  6 12:00 dir3
-rw-r--r-- 1 root root     0 Nov  6 12:00 file1
-rw-r--r-- 1 root root     0 Nov  6 12:00 file2
drwx------ 2 root root 16384 Nov  5 18:55 lost+found
drwxr-xr-x 2 root root  4096 Nov  5 18:58 test
```

We are going to create a snapshot of our **LV** :

```bash
sudo lvcreate -s -n snap_lv1 -L 1GB lvm_tutorial/lv1
```

Show the logical volumes :

```
vagrant@lvm:/mnt/lv1$ sudo lvs
LV       VG           Attr       LSize Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
lv1      lvm_tutorial owi-aos--- 7.00g
snap_lv1 lvm_tutorial swi-a-s--- 1.00g      lv1    0.01
```

Let's simulate a loss of data in our LV :

```bash
sudo rmdir /mnt/lv1/dir2/ && sudo rm /mnt/lv1/file1
```

Try to restore from the snapshot :

```
vagrant@lvm:/mnt/lv1$ sudo lvconvert --merge /dev/lvm_tutorial/snap_lv1
  Delaying merge since origin is open.
  Merging of snapshot lvm_tutorial/snap_lv1 will occur on next activation of lvm_tutorial/lv1.
```

You must unmount the **LV** and re-activate it. Follow these steps :

```bash
sudo umount /mnt/lv1/
```

Then :

```bash
sudo lvchange -an /dev/lvm_tutorial/lv1
```

Finally :

```bash
sudo lvchange -ay /dev/lvm_tutorial/lv1
```

Now you can mount the **LV**, and **surprise** ! The deleted file/directory appear !
You just restored your **LV** thanks to a snapshot.


## 2. RAID

### 2.1. What is a RAID ?

### 2.2. Deep dive into RAID 1

#### 2.2.1. Creation 

First, to create our RAID1, we need two hard disks, with which we will create two PV and one VG.
Then, we will create two LV on this VG on which we will create our RAID1 :

```
vagrant@leyo:~$ sudo lvcreate -l 100%FREE -n lv1 vg1
  Logical volume "lv1" created.
vagrant@leyo:~$ sudo lvcreate -l 100%FREE -n lv0 vg0
  Logical volume "lv0" created.
```

Now, to handle our RAID, we need to start this service :

```
vagrant@leyo:~$ sudo systemctl start mdmonitor
vagrant@leyo:~$ systemctl status mdmonitor
● mdmonitor.service - MD array monitor
     Loaded: loaded (/lib/systemd/system/mdmonitor.service; static)
     Active: active (running) since Tue 2022-11-08 10:48:31 UTC; 7s ago
       Docs: man:mdadm(8)
   Main PID: 11524 (mdadm)
      Tasks: 1 (limit: 1131)
     Memory: 196.0K
        CPU: 22ms
     CGroup: /system.slice/mdmonitor.service
             └─11524 /sbin/mdadm --monitor --scan
```

And, we can create the RAID with this command :
```bash
sudo mdadm --create --verbose /dev/md0 --level 1 --raid-devices 2 /dev/vg/lv0 /dev/vg/lv1
```

- Output :

```
mdadm: Note: this array has metadata at the start and
    may not be suitable as a boot device.  If you plan to
    store '/boot' on this device please ensure that
    your boot-loader understands md/v1.x metadata, or use
    --metadata=0.90
mdadm: size set to 5236736K
Continue creating array? y
mdadm: Defaulting to version 1.2 metadata
mdadm: array /dev/md0 started.
```

Showing details about the RAID :

```bash
sudo mdadm -D /dev/md0
```

- Output :

```
/dev/md0:
           Version : 1.2
     Creation Time : Tue Nov  8 17:35:15 2022
        Raid Level : raid1
        Array Size : 5233664 (4.99 GiB 5.36 GB)
     Used Dev Size : 5233664 (4.99 GiB 5.36 GB)
      Raid Devices : 2
     Total Devices : 2
       Persistence : Superblock is persistent

       Update Time : Tue Nov  8 17:35:41 2022
             State : clean
    Active Devices : 2
   Working Devices : 2
    Failed Devices : 0
     Spare Devices : 0

Consistency Policy : resync

              Name : lvm:0  (local to host lvm)
              UUID : 69adbce7:58770a91:62b548ed:5495d031
            Events : 17

    Number   Major   Minor   RaidDevice State
       0     253        0        0      active sync   /dev/dm-0
       1     253        1        1      active sync   /dev/dm-1
```

```
Personalities : [raid1]
md0 : active raid1 dm-1[1] dm-0[0]
      5233664 blocks super 1.2 [2/2] [UU]

unused devices: <none>
```

And here, a global view of where we are :

```
vagrant@leyo:~$ lsblk
NAME       MAJ:MIN RM SIZE RO TYPE  MOUNTPOINT
sda          8:0    0  20G  0 disk
└─sda1       8:1    0  20G  0 part  /
sdb          8:16   0   5G  0 disk
└─sdb1       8:17   0   5G  0 part
  └─vg-lv0 253:0    0   5G  0 lvm
    └─md0    9:0    0   5G  0 raid1
sdc          8:32   0   5G  0 disk
└─sdc1       8:33   0   5G  0 part
  └─vg-lv1 253:1    0   5G  0 lvm
    └─md0    9:0    0   5G  0 raid1
```

Now, our RAID is ready, and we can format ``/dev/md0`` to **ext4** for example :

```bash
sudo mkfs.ext4 /dev/md0
```

Then, mount the new formatted **LV** :

```bash
sudo mount -t ext4 /dev/md0 /mnt
```

If you want your disk to be mounted at startup, you can edit the file at ``/etc/fstab`` by adding at the end the following line :

```
/dev/md0        /mnt/raidX           ext2    defaults                0       0
```

You can now create your store data within the mounted point.

#### 2.2.2. Recovering

RAID 1 is for high availability.

Let's simulate a hard disk crash and recover the data of the disk.


