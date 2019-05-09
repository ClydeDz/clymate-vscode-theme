const assert = require('assert');
const fs = require('fs');

describe('confirm all JSON theme files exist', function() {
  let packageJSON = require('./../package.json');
  let packageJSONContents = JSON.parse(JSON.stringify(packageJSON));  
  let allThemes = packageJSONContents.contributes.themes; 
  let themeFiles = [];
  for(var files = 0; files < allThemes.length; files++){
    var filename = allThemes[files].path.substring(allThemes[files].path.lastIndexOf('/')+1);
    themeFiles.push(filename);
  } 
  
  it('all JSON files must contain content', function() {
    for(var fileIndex = 0; fileIndex < themeFiles.length; fileIndex++) {
      var checkPath = null;
      try {
        console.log("\tchecking file:", themeFiles[fileIndex], "✔️");
        checkPath = fs.readFileSync(require.resolve("./../themes/"+themeFiles[fileIndex]), "utf8");
      }
      catch {
        checkPath = '';
      }  
      assert.equal(checkPath.length > 0, true);
    }    
  });
}); 
