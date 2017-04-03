# Yeoman with some generators and prerequisites
FROM node:6.10.0-slim

MAINTAINER cmelion <cfulnecky@gmail.com>

ARG DEBIAN_FRONTEND
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -yq update && \
    apt-get -yq install git net-tools sudo bzip2 && \
    apt-get -yq install libfontconfig

RUN npm install -g --silent yo@1.8.5 generator-redux-observable

# Add a yeoman user because grunt doesn't like being root
RUN adduser --disabled-password --gecos "" yeoman && \
  echo "yeoman ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# set HOME so 'npm install' doesn't write to /
ENV HOME /home/yeoman

ENV LANG en_US.UTF-8

RUN mkdir /home/yeoman/client && chown yeoman:yeoman /home/yeoman/client
WORKDIR /home/yeoman/client

ADD set_env.sh /usr/local/sbin/
RUN chmod +x /usr/local/sbin/set_env.sh
ENTRYPOINT ["set_env.sh"]

# Always run as the yeoman user
USER yeoman

RUN yo redux-observable --name="client" --clientFolder="src" --serverhostname="client"

# Set the host file system mount point
#VOLUME /home/yeoman/client

# Expose the port
EXPOSE 2368 3000 5000 8000 8080 8983 9200

CMD ["npm", "run", "docker-server"]
