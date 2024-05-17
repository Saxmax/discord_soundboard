FROM node:18-alpine

RUN apk update
RUN apk add bash
RUN apk add git

COPY auth.json auth.json
COPY start.sh start.sh

RUN chmod +x start.sh

CMD ./start.sh