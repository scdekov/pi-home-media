# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # Every Vagrant virtual environment requires a box to build off of.
    config.vm.box = "bento/ubuntu-16.04"

  config.vm.provider "virtualbox" do |v|
    v.name = 'Pi home media VM'
    v.memory = 2048
  end

  config.vm.network "forwarded_port", guest: 3000, host: 3030
  config.vm.network :forwarded_port, guest: 22, host: 2223, id: 'ssh'

  config.vm.provision "shell", inline: ". /vagrant/deploy/vagrant-bootstrap-asnible.sh"
  config.vm.provision "shell", inline: "cp -r /vagrant /home/vagrant/"
end
