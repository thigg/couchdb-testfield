# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "debian/stretch64"

# config.vm.network :private_network,ip: "10.0.0.10",lxc__bridge_name: 'vlxcbr1'
 
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
     apt-get update && apt-get install -y  apt-transport-https curl
     echo "deb https://apache.bintray.com/couchdb-deb stretch main" | sudo tee -a /etc/apt/sources.list
     curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc   | sudo apt-key add -
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
DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes couchdb

     echo "alias pj='python -m json.tool'" >> .bashrc
   SHELL
end
