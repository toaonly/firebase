# @toaonly/firebase

## Install

```
yarn add @toaonly/firebase@latest
```

## Test

- normally test
  ```
  yarn test
  ```
- use watching test
  ```
  yarn test:watch
  ```
- get coverage report
  ```
  yarn test test:coverage
  ```

## Run github actions locally

- install `act`
  - [Install Link](https://github.com/nektos/act)
- `act` config files
  - `.actrc`
  - `.act/*.json`
- Test command
  - `on: push`
    ```
    act -e .act/push.json
    ```
  - `on: pull_request`
    ```
    act pull_request -e .act/pull-request.json
    ```
