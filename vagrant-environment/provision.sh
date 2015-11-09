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
sudo apt-get install --reinstall  -y --force-yes -o Dpkg::options::=--force-confold $QUIET_APT openjdk-7-jre-headless=7u51-2.4.6-1ubuntu4 openjdk-7-jre=7u51-2.4.6-1ubuntu4 openjdk-7-jdk=7u51-2.4.6-1ubuntu4 jenkins mysql-server python3-dev libmysqlclient-dev libjpeg-dev mc dos2unix nginx git nodejs-legacy npm

#Run Jenkins from vagrant user
service jenkins stop
sed -i 's/JENKINS_USER=\$NAME/JENKINS_USER=vagrant/g' /etc/default/jenkins
sed -i 's/JENKINS_GROUP=\$NAME/JENKINS_GROUP=vagrant/g' /etc/default/jenkins
sudo chown -R vagrant:vagrant /var/log/jenkins/
sudo chown -R vagrant:vagrant /var/lib/jenkins/
sudo chown -R vagrant:vagrant /var/cache/jenkins/
sudo service jenkins start

echo "Installing python pip tool and virtualenv"
sudo apt-get install --reinstall -y python-pip $QUIET_APT
sudo pip install virtualenv
sudo pip install virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs

echo "Grant permittion to MySQL root"
echo "grant all privileges on *.* to 'root'@'%' with grant option;" | mysql -u root -pgymio
echo "flush privileges;" | mysql -u root -pgymio

echo "Copying Jenkins plugins and job config files ..."
sudo cp $CONF_DIR/jenkins_plugins/* /var/lib/jenkins/plugins/
sudo chown -R vagrant:vagrant /var/lib/jenkins/plugins/
sudo chmod -R 777  /var/lib/jenkins/plugins/

sudo cp -r $CONF_DIR/jenkins_jobs/* /var/lib/jenkins/jobs/
sudo chown -R vagrant:vagrant /var/lib/jenkins/jobs/
sudo chmod -R 777  /var/lib/jenkins/jobs/

sudo service jenkins restart || exit 1

echo "Copying Nginx configs ..."
sudo cp $CONF_DIR/nginx_site_configs/* /etc/nginx/sites-available/
sudo cp $CONF_DIR/nginx_config/* /etc/nginx/

sudo service nginx restart

echo "Open Mysql to listen on 0.0.0.0"
sudo sed -i "s/127.0.0.1/0.0.0.0/g" /etc/mysql/my.cnf
sudo service mysql restart
