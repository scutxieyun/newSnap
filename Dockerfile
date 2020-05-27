FROM buildkite/puppeteer
ADD simfang.ttf /usr/share/fonts
RUN chmod 775 /usr/share/fonts/simfang.ttf
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
USER node
WORKDIR /home/node
ADD . .
RUN npm install -s js-md5
RUN npm install -s node-schedule
RUN npm install -s axios
RUN npm install -s yargs
