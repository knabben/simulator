#
# Do not hard code credentails in this file
# Do not place aws credentails file into this repo
#
provider "aws" { }

terraform {
  backend "s3" {
    key     = "simulator.tfstate"
    bucket  = "simulator-standalone-terraform-state"
    encrypt = true // Optional, S3 Bucket Server Side Encryption
  }
}
