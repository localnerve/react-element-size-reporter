/***
 * Copyright (c) 2016 - 2018 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */

let waitMilliseconds;

export default function debounce (fn, wait) {
  if (typeof fn === 'string') {
    return waitMilliseconds;
  }
  waitMilliseconds = wait;
  return fn;
}
