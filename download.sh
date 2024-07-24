#!/usr/bin/env bash
curl -s 'https://www.tanach.us/Books/Tanach.xml.zip' > Tanach.zip
unzip Tanach.zip "Books/*.xml"
mv Books/*.xml .
rm -rf Books Tanach* *.DH.xml
