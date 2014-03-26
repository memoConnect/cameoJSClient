FROM ubuntu:latest

# update and install git and java
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y --no-install-recommends openjdk-7-jdk

ADD ./target /opt/app

EXPOSE 9000

WORKDIR /opt/app/

ENTRYPOINT ["bin/cameoserver","-Dconfig.file=conf/secret.conf"]