# require-codeowners

A simple CLI tool to check that repository folders are covered by explicit codeowners.

Useful when you have a repository maintained by several teams, but you want to ensure a set of folders are actually owned, and don't fall through to the global code owners.

## Use

Executed from the respository you want to check:

`yarn add -D require-codeowners`

`yarn require-codeowners "./packages/*"`

If the command detects any matches to the glob that are _not_ codeowned, it will exit with a non-zero exit code and list the matches not covered.

## Tips

- Make sure the glob pattern is enclosed in quotes
- It's a good idea to be very specific with your glob pattern, there is no need to check _every_ file or sub-directory below the level you're interested in
