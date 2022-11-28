const prefixNode = function (value) {
  this.value = value ? value : '';
  this.children = {};
  this.isWord = false;
};

prefixNode.prototype.addword = function (string) {
  var word = string.split('');
  var letter = word.shift();

  if (this.children[letter]) {
    if (word.length > 0) {
      this.children[letter].addword(word.join(''));
    } else {
      this.children[letter].isWord = true;
    }
  } else {
    this.children[letter] = new prefixNode(letter);
    if (word.length > 0) {
      this.children[letter].addword(word.join(''));
    } else {
      this.children[letter].isWord = true;
    }
  }
};

prefixNode.prototype.startsWith = function (prefix) {
  var results = [];
  if (prefix.length > 0) {
    let word = prefix.split('');
    let letter = word.shift();
    if (this.children[letter]) {
      let data1 = this.children[letter].startsWith(word.join(''));
      data1.map((partialWord) => {
        results.push(this.value + partialWord);
      });
      if (this.isWord) {
        results.push(this.value);
      }
    }
  } else {
    if (Object.keys(this.children).length > 0) {
      for (const child in this.children) {
        let data2 = this.children[child].startsWith('');
        data2.map((item) => {
          results.push(this.value + item);
        });
        if (this.isWord) {
          results.push(this.value);
        }
      }
    } else if (this.isWord) {
      results.push(this.value);
    }
  }
  return results;
};

export default prefixNode;
