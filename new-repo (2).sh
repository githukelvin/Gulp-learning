#! /bin/bash/

git init



echo "Enter the file to be pushed"
read  file
git add $file

echo "Enter the Commit to Push the Code"

read commit

git commit -m "$commit"

echo "Enter the name of the Branch"
read branch

git branch -M $branch

echo "Copy the repository link and shift+ insert to paste the link"
read url

git remote add origin $url

git push -u origin $branch
