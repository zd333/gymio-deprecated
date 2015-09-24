#!/bin/bash
CONF_DIR=//vagrant/vagrant-environment/conf
QUIET_APT=-qq

wget -q -O - https://jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password gymio'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password gymio'

# Set things up
sudo apt-get update --yes $QUIET_APT
# Java 1.7.0_51 is what Amazon has...
sudo apt-get install --reinstall  -y --force-yes -o Dpkg::options::=--force-confold $QUIET_APT openjdk-7-jre-headless=7u51-2.4.6-1ubuntu4 openjdk-7-jre=7u51-2.4.6-1ubuntu4 openjdk-7-jdk=7u51-2.4.6-1ubuntu4 jenkins mysql-server mc dos2unix

echo "Copying Jenkins job config files ..."
sudo cp -r $CONF_DIR/jenkins/* /var/lib/jenkins/jobs/
sudo chown -R vagrant:vagrant /var/lib/jenkins/jobs/
sudo chmod -R 777  /var/lib/jenkins/jobs/
sudo service jenkins restart || exit 1
