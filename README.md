# Github Action for mapping variables by a specific key <a href="https://github.com/kanga333/map/actions"><img alt="map status" src="https://github.com/actions/kanga333/map/build-test/badge.svg"></a>

MAP action maps variables by regular expressions.

- The map argument is a configuration in json format.
  - The top-level key in JSON is a regular expression condition. They are evaluated in order from the top.
  - The value corresponding to the regular expression is the key-value pair of variables to be exported.
- The key argument is the key to match the map.

## Sample Workflows

### Export variables corresponding to regular expression-matched keys

```yaml
on: [push]
name: Export variables corresponding to regular expression-matched keys
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: kanga333/map@v1 
      with:
        key: ${{GITHUB_REF#refs/heads/}}
        map: |
          {
            "master": {
              "environment": "production",
              "AWS_ACCESS_KEY_ID": ${{ secrets.PROD_AWS_ACCESS_KEY_ID }},
              "AWS_SECRET_ACCESS_KEY": ${{ secrets.PROD_AWS_ACCESS_KEY_ID }}
            },
            "staging": {
              "environment": "staging",
              "AWS_ACCESS_KEY_ID": ${{ secrets.STG_AWS_ACCESS_KEY_ID }},
              "AWS_SECRET_ACCESS_KEY": ${{ secrets.STG_AWS_ACCESS_KEY_ID }}
            },
            ".*": {
              "environment": "development",
              "AWS_ACCESS_KEY_ID": ${{ secrets.DEV_AWS_ACCESS_KEY_ID }},
              "AWS_SECRET_ACCESS_KEY": ${{ secrets.DEV_AWS_ACCESS_KEY_ID }}
            }
          }
    - name: Echo environment
      run: echo ${{ env.environment }}
```

The key is evaluated from the top and exports the first matched variables.

### Export variables to output and environment and log

```yaml
on: [push]
name: Export variables to output and environment and log
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: kanga333/map@v1 
      id: export
      with:
        key: ${{GITHUB_REF#refs/heads/}}
        map: |
          {
            "master": {
              "environment": "production"
            }
            ".*": {
              "environment": "development"
            }
          }
        export_to: env,log,output
    - name: Echo environment and output
      run: |
        echo ${{ env.environment }}
        echo ${{ steps.export.outputs.environment }}
```

The variables can be exported to log, env and output. (Default is `log,env`)
