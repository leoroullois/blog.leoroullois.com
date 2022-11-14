---
title: 'Recon'
description: 'Learn the basics of recon'
image: /posts/got.jpg
tags: pentest
date: 21/11/2022
author: '@ley0x_'
---

## Table of content

- [Table of content](#table-of-content)
- [Recon](#recon)
  - [robots.txt](#robotstxt)
  - [security.txt](#securitytxt)
  - [Directory listing](#directory-listing)

## Recon

### robots.txt

The robots.txt file is used to tell web spiders how to crawl a website. To avoid having confidential information indexed and searchable, webmasters often use this file to tell spiders to avoid specific pages. This is done using the keyword Disallow. You can find more about the robots.txt file by reading Robots exclusion standard

[Wikipedia](https://en.wikipedia.org/wiki/Robots_exclusion_standard)

### security.txt

[securitytxt](https://securitytxt.org/)

### Directory listing

When accessing a directory on a webserver, multiple things can happen:

an "index" file is present and it will get returned. N.B.: the file is not necessarily named index, this can be configured. But most of the time, the file will benamed index.html
no "index" file is present and the webserver will list the content of the directory. This can obviously leak information.
Indexing directory can be disabled on most webservers. For example, with Apache, you need to use the option: -Indexes.

try changing the host http header :
`curl http://leoroullois.com/ -H "Host: random"`
