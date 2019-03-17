# tcmount

Due to the discontinuation of TrueCrypt, this package is no longer supported or recommended!

Instead, use [VeraCrypt](https://www.veracrypt.fr). Install VeraCrypt on OSX with:
```bash
brew cask reinstall veracrypt osxfuse
```

and use with these aliases:
```bash
alias vc='/Applications/VeraCrypt.app/Contents/MacOS/VeraCrypt -t'
alias vctc='vc --truecrypt'
alias vu='vc -d'
alias vm='vc -k="" --protect-hidden=no --pim=0'
alias vmro='vm -m readonly'
```
