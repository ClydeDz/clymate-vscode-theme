const assert = require('assert');
const fs = require('fs');
const stripComments = require('strip-json-comments');

describe('JSON color themes', function () {
  var allThemes;

  before(function () {
    var packageJSON = require('./../package.json');
    var packageJSONContents = JSON.parse(JSON.stringify(packageJSON));
    allThemes = packageJSONContents.contributes.themes;
  });

  it('check if all JSON theme files exist', function () {
    for (var theme = 0; theme < allThemes.length; theme++) {
      var checkPath = null;
      var filename = allThemes[theme].path.substring(allThemes[theme].path.lastIndexOf('/') + 1);

      try {
        console.log("\t", "[log]", "checking file:", filename, "✔️");
        checkPath = fs.readFileSync(require.resolve("./../themes/" + filename), "utf8");
      }
      catch {
        checkPath = '';
        console.log("\t", "[log]", "error while checking file:", filename, "❌");
      }
      assert.equal(checkPath.length > 0, true, "file must exist and must contain content");
    }
  });

  it('check if the theme type, a.k.a. dark or light, is applied correctly', function () {
    for (var theme = 0; theme < allThemes.length; theme++) {
      var filename = allThemes[theme].path.substring(allThemes[theme].path.lastIndexOf('/') + 1);
      var setTheme = allThemes[theme].uiTheme == "vs" ? "light" : "dark";
      var appliedTheme;

      try {
        console.log("\t", "[log]", "reading file:", filename, "✔️");
        var themeFileContents = fs.readFileSync(require.resolve("./../themes/" + filename), "utf8");
        var themeFileContentsJSON = JSON.parse( //Need to add an extra JSON.parse to properly convert to JSON
          JSON.parse(
            JSON.stringify(
              stripComments(themeFileContents).trim()
            )));
        appliedTheme = themeFileContentsJSON.type;
        console.log("\t\t", "[log]", "detected theme:", appliedTheme == "light" ? "☀️" : "🌙");
      }
      catch {
        appliedTheme = '';
        console.log("\t", "[log]", "error while reading file:", filename, "❌");
      }

      assert.equal(appliedTheme == setTheme, true, "`uitheme` for each theme in package.json must match the property `type` in the theme color JSON file");
    }
  });
}); 
