#Contributing

##General Workflow

###If you are just beginning#

1. Clone the main repository to your local machine

###If you already have the repository on your machine

1.While working and before big merges use the command:

    git pull --rebase origin staging 

2. The staging branch will have the most up to date features that have been merged.

3. When you want to add a feature create a new branch for it:

    git checkout -b branchname

4.Make your changes with clear commit messages.

5. When your feature is complete make sure to update with the current code on staging:

    git pull --rebase origin staging

6.You can then push your changes to your branch on the remote repository:

    git push origin branchname

(Be careful to not push to master here)

7. The scrum master or another member of the team will review your code and handle the merging

8. This is known as the gitflow workflow https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow 
Ask questions if anything here is confusing

**Make sure the pull requests are to staging and not master**

More info about issues and waffle integration to come
