mkdir tools
cd tools
mkdir dl
mkdir local

cd dl
wget https://nodejs.org/dist/v12.22.10/node-v12.22.10-linux-x64.tar.xz
tar xvf node-v12.22.10-linux-x64.tar.xz
mv node-v12.22.10-linux-x64 ../local/node

cd ../local/node/bin
node_dir=`pwd`

echo "${node_dir}:\$PATH" > ~/.bashrc
echo "alias sudo='sudo env PATH=\$PATH'" > ~/.bashrc
source ~/.bashrc
