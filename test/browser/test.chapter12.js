var expect = chai.expect;

describe('Chapter 12', function() {
  context('DOM attributes and properties', function() {
    var div;

    beforeEach( function() {
      div = document.getElementsByClassName('test-me')[0];
    });

    it('uses setAttribute to change the attribute', function() {
      div.setAttribute('id', 'bobby');
      expect(div.getAttribute('id')).to.eq('bobby');
    });

    it('set the property directly on the object', function() {
      div.id = 'roberta';
      expect(div.id).to.eq('roberta');
    });

    it('recognizes attribute changes via property', function() {
      div.id = 'robertaness';
      expect(div.getAttribute('id')).to.eq('robertaness');
    });

    it('recognizes property changes via attribute', function() {
      div.setAttribute('id', 'boberta');
      expect(div.id).to.eq('boberta');
    });
  });

  context('Cross browser', function() {
    context('form behaviors', function() {
      var form;

      beforeEach( function() {
        form = document.getElementById('testForm');
      });

      it('preserve named attributes for id and action', function() {
        expect(form.getAttribute('id')).to.eq('testForm');
        expect(form.getAttribute('action')).to.eq('/');
      });

      it('override the properties with references to the inputs', function() {
        expect(form.id).to.not.eq('testForm');
        expect(form.action).to.not.eq('/');
      });

      it('can access the action value with getAttributeNode', function() {
        expect(form.getAttributeNode('id').nodeValue).to.eq('testForm');
        expect(form.getAttributeNode('action').nodeValue).to.eq('/');
      });
    });

    context('url normalization', function() {
      var link;

      beforeEach( function() {
        link = document.getElementById('testLink');
      });

      it('returns original href string with attributes', function() {
        expect(link.getAttribute('href')).to.eq('#');
      });

      it('returns full url path with properties', function() {
        expect(link.href).to.eq(document.URL + '#');
      });

      it('preserves original string using nodeValue', function() {
        expect(link.getAttributeNode('href').nodeValue).to.eq('#');
      });

    });

    context('type attribution with inputs', function() {
      // these tests will fail in IE 8
      var input;

      beforeEach( function() {
        input = document.createElement('input');
      });

      it('using properties sets the type', function() {
        input.type = 'text';
        expect(input.type).to.eq('text');
      });

      it('after insertion, type can be modified', function() {
        document.getElementById('testForm').appendChild(input);
        input.type = 'hidden';
        expect(input.type).to.eq('hidden');
      });

    });
  });
});
