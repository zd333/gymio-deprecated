#Gym management system.

##Project resources:
 * Project group:           gymio@googlegroups.com
 * Project docs:            https://drive.google.com/drive/folders/0B2nqZU8e7A9XRTFwOVBESGZJbmM
 * Project tracking system: https://tree.taiga.io/project/zd333-gymio/

## How to use Vagrant environment
### Install following apps:
 * Vitrualbox >=v5.0.4
 * Install Vagrant >=1.7.4
 * Install vagrant plugins "vagrant plugin install vagrant-vbguest"
### How to run:
 * From project root directory execute "vagrant up" and "vagrant provision" commands
 * Start this job to make backend service work: http://localhost:8085/job/RunBackendDevPythonWebServer/

##Dev environment resources
### SSH box's credentials:
 * phrase:
 * password: vagrant
### Jenkins host:
  * http://localhost:8085
### Mysql credentials:
 * user:     root
 * password: gymio
 * host:     localhost
 * port:     3307
### Django admin panel:
 * http://localhost:8008/sc1/admin/
 * superuser:admin
 * password: gymio
### RESTful API documentation:
 * http://localhost:8008/sc1/restful_docs/
### Frontend (Nginx) root
 * http://localhost:8001/
