#!/bin/bash
ls
rm -rf /dinmammabot
git clone https://github.com/Saxmax/dinmammabot.git
cp auth.json /dinmammabot
cd dinmammabot
npm install
node mother.js