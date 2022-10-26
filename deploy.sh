#!/bin/bash

user=$1
ip=$2
app=$3

function deploy {
  echo "[o2switch] Start building"
  yarn build

  echo "[o2switch] Start scp"
  scp -r .next/ $user@$ip:/home/$user/apps/$app/

  echo "[o2switch] Success."
}

echo "User : $user"
echo "@IP : $ip"
echo "App : $app"

read -p "Do you want to continue ? [Y|n] " choice
case "$choice" in
  y|Y) deploy
  ;;
esac

