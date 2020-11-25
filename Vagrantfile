# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "debian/buster64"

config.vm.synced_folder ".", "/vagrant", disabled: true
# config.vm.network :private_network,ip: "10.0.0.10",lxc__bridge_name: 'vlxcbr1'

config.vm.define :eta do |beta|
    beta.vm.network :private_network, ip: "10.0.0.14"
    beta.vm.hostname = "beta"
 #   beta.vm.network "forwarded_port", guest: 5984, host: 5985,  auto_correct: true
  end
config.vm.define :delta do |beta|
    beta.vm.network :private_network, ip: "10.0.0.13"
    beta.vm.hostname = "beta"
 #   beta.vm.network "forwarded_port", guest: 5984, host: 5985,  auto_correct: true
  end

 
  config.vm.define :alpha do |alpha|
    alpha.vm.network :private_network, ip: "10.0.0.10"
    alpha.vm.hostname = "alpha"
#    alpha.vm.network "forwarded_port", guest: 5984, host: 5984,  auto_correct: true
  end

  config.vm.define :beta do |beta|
    beta.vm.network :private_network, ip: "10.0.0.11"
    beta.vm.hostname = "beta"
 #   beta.vm.network "forwarded_port", guest: 5984, host: 5985,  auto_correct: true
  end

  config.vm.define :gamma do |gamma|
    gamma.vm.network :private_network, ip: "10.0.0.12"
    gamma.vm.hostname = "gamma"
 #   gamma.vm.network "forwarded_port", guest: 5984, host: 5986,  auto_correct: true
  end
 

   config.vm.provision "shell", inline: <<-SHELL
     apt-get update && apt-get install -y  apt-transport-https curl gnupg2
     echo "deb https://apache.bintray.com/couchdb-deb buster main" | sudo tee /etc/apt/sources.list.d/couchdb.list
     sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8756C4F765C9AC3CB6B85D62379CE192D401AB61
     apt-get update
COUCHDB_PASSWORD="password"
echo "couchdb couchdb/mode select clustered
couchdb couchdb/mode seen true
couchdb couchdb/nodename string couchdb@machine.domain.com
couchdb couchdb/nodename seen true
couchdb couchdb/cookie string elmo
couchdb couchdb/cookie seen true
couchdb couchdb/bindaddress string 0.0.0.0
couchdb couchdb/bindaddress seen true
couchdb couchdb/adminpass password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass seen true
couchdb couchdb/adminpass_again password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass_again seen true" | sudo debconf-set-selections
DEBIAN_FRONTEND=noninteractive apt-get install -y couchdb

     echo "alias pj='python -m json.tool'" >> .bashrc
   SHELL
end
