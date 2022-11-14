---
title: 'Linux RAID'
description: 'Create a RAID for High Availability'
image: /posts/got.jpg
tags: linux bash
date: 21/11/2022
author: '@ley0x_'
---

## 2. RAID

### What is a RAID ?

Le RAID, Redundant Arrays of Inexpensive Disks est une technologie permettant l’usage de plusieurs disques simultanément. Il peut optimiser les performances, gérer la tolérance de panne ou les deux à la fois.

mdadm

### Deep dive into RAID 1

#### Creation 

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

#### Recovering

RAID 1 is for high availability.

Let's simulate a hard disk crash and recover the data of the disk.


```
Number   Major   Minor   RaidDevice State
0        253     0       0          active sync   /dev/dm-0
1        253     1       1          removed
```

```
root@bullseye:~# mdadm --manage /dev/md0 --fail /dev/vg0/lv1
mdadm: set /dev/vg0/lv1 faulty in /dev/md0
root@bullseye:~# mdadm -D /dev/md0
/dev/md0:
           Version : 1.2
     Creation Time : Wed Nov  9 18:24:54 2022
        Raid Level : raid1
        Array Size : 5233664 (4.99 GiB 5.36 GB)
     Used Dev Size : 5233664 (4.99 GiB 5.36 GB)
      Raid Devices : 2
     Total Devices : 2
       Persistence : Superblock is persistent

       Update Time : Wed Nov  9 18:39:42 2022
             State : clean, degraded
    Active Devices : 1
   Working Devices : 1
    Failed Devices : 1
     Spare Devices : 0

Consistency Policy : resync

              Name : bullseye:0  (local to host bullseye)
              UUID : 266fdd93:167cf7e5:02c72b75:52ff0a6a
            Events : 19

    Number   Major   Minor   RaidDevice State
       0     253        0        0      active sync   /dev/dm-0
       -       0        0        1      removed

       1     253        1        -      faulty   /dev/dm-1
```

```
root@bullseye:~# mdadm --manage /dev/md0 --add /dev/vg1/lv2
mdadm: added /dev/vg1/lv2
root@bullseye:~# mdadm -D /dev/md0
/dev/md0:
           Version : 1.2
     Creation Time : Wed Nov  9 18:24:54 2022
        Raid Level : raid1
        Array Size : 5233664 (4.99 GiB 5.36 GB)
     Used Dev Size : 5233664 (4.99 GiB 5.36 GB)
      Raid Devices : 2
     Total Devices : 3
       Persistence : Superblock is persistent

       Update Time : Wed Nov  9 18:57:55 2022
             State : clean, degraded, recovering
    Active Devices : 1
   Working Devices : 2
    Failed Devices : 1
     Spare Devices : 1

Consistency Policy : resync

    Rebuild Status : 19% complete

              Name : bullseye:0  (local to host bullseye)
              UUID : 266fdd93:167cf7e5:02c72b75:52ff0a6a
            Events : 28

    Number   Major   Minor   RaidDevice State
       0     253        0        0      active sync   /dev/dm-0
       2     253        2        1      spare rebuilding   /dev/dm-2

       1     253        1        -      faulty   /dev/dm-1
```

```
    Number   Major   Minor   RaidDevice State
       0     253        0        0      active sync   /dev/dm-0
       2     253        2        1      active sync   /dev/dm-2

       1     253        1        -      faulty   /dev/dm-1
```

```
root@bullseye:~# mdadm --manage /dev/md0 --remove /dev/vg0/lv1
mdadm: hot removed /dev/vg0/lv1 from /dev/md0
```

```
    Number   Major   Minor   RaidDevice State
       0     253        0        0      active sync   /dev/dm-0
       2     253        2        1      active sync   /dev/dm-2
```

```
mdadm -D /dev/md0 --scan >> /etc/mdadm/mdadm.conf
update-initramfs -u
```

```
mdadm --stop /dev/md0
mdadm --assemble /dev/md0
```

## Chiffrement

```bash
apt install cryptsetup
```

```
sudo cryptsetup luksFormat /dev/md0
sudo cryptsetup luksOpen /dev/md0 secure
```


```
root@bullseye:/# umount /mnt
root@bullseye:/# cryptsetup luksFormat -c aes -h sha256 /dev/md0
WARNING: Device /dev/md0 already contains a 'ext4' superblock signature.

WARNING!
========
This will overwrite data on /dev/md0 irrevocably.

Are you sure? (Type 'yes' in capital letters): YES
Enter passphrase for /dev/md0:
Verify passphrase:
```

```
root@bullseye:/# cryptsetup luksOpen /dev/md0 DATA
Enter passphrase for /dev/md0:
root@bullseye:/# mkfs.ext4 /dev/mapper/DATA
mke2fs 1.46.2 (28-Feb-2021)
Creating filesystem with 1304320 4k blocks and 326400 inodes
Filesystem UUID: e320bbc2-f254-4e81-bcb1-6fe89e2ead81
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736

Allocating group tables: done
Writing inode tables: done
Creating journal (16384 blocks): done
Writing superblocks and filesystem accounting information: done
```

```
root@bullseye:/# mount /dev/mapper/secure /mnt
mount: /mnt: special device /dev/mapper/secure does not exist.
root@bullseye:/# mount /dev/mapper/DATA /mnt
root@bullseye:/# cd /mnt/
root@bullseye:/mnt# echo "Hello world!" > test.txt
root@bullseye:/mnt# ls
lost+found  test.txt
root@bullseye:/mnt# cd /
root@bullseye:/# umount /mnt
root@bullseye:/# cryptsetup luksClose DATA
```
