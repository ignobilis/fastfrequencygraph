// TODO:

function FASTFrequencyGraph(element, data, options) {
  this.defaultValue = 1234;
  this.minValue = this.defaultValue;
  this.maxValue = this.defaultValue;
	
  this._data = (data ? data : [
    ['FAST Frequency Graph', 'Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7'],
    ['Row 1', this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue],
    ['Row 2', this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue],
    ['Row 3', this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue],
    ['Row 4', this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue],
    ['Row 5', this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue, this.defaultValue]
  ]);
  
  this.options = Object.assign({	  
	cellBorderWidth: 1,
	cellIsSquare: false,
	
    firstColumnRatio: 4,
	
	marginBottom: 0,
	marginLeft: 0,
	marginRight: 0,
	marginTop: 0,

	maxWidth: 999999,

	rowHeight: 30
  }, options);
  
  this._calcDataMetrics();
  
  this.element = $('#' + element);
  
  return this;
}

Object.defineProperty(FASTFrequencyGraph.prototype, 'data', {
  get:function() {
    return this._data;
  },
  set:function(data) {
    this._data = data;
    this._calcDataMetrics();
  }
});

FASTFrequencyGraph.prototype._calcDataMetrics = function() {
  this.columnCount = this._data[0].length;
  this.rowCount = this._data.length;

  var i;
  var j;
  this.minValue = 0;
  this.maxValue = 0;
  for (i = 1; i < this.rowCount; i++) {
    for (j = 1; j < this.columnCount; j++) {
      if (this._data[i][j] < this.minValue) {
	    this.minValue = this._data[i][j];
	  }
      if (this._data[i][j] > this.maxValue) {
	    this.maxValue = this._data[i][j];
	  }
    }
  }
  
  return this;
}

FASTFrequencyGraph.prototype.refresh = function() {
  this.width = Math.min(this.element.parent().width() - this.options.marginLeft - this.options.marginRight - ((this.columnCount + 1) * this.options.cellBorderWidth), this.options.maxWidth);
  this.columnWidth = Math.floor((this.width/(this.columnCount + this.options.firstColumnRatio - 1)));

  var html = '<div class="ffgContainer" style="left:' + this.options.marginLeft + 'px;top:' + this.options.marginTop + 'px;">';
  var i;
  var maxDiam = eval(this.columnWidth - 4);
  var minDiam = 6;
  var diam;

  for (i = 0; i < this.rowCount; i++) {
	html += '<div class="ffgRow">';
    for (j = 0; j < this.columnCount; j++) {
      html += '<div class="ffgCell' + (j==0 ? ' ffgFirstColumn' : '' ) + (i==0 ? ' ffgFirstRow' : '' ) + '" style="width:' + (j==0 ? (this.columnWidth * this.options.firstColumnRatio) : this.columnWidth) + 'px;height:' + (i==0 ? this.options.rowHeight : (this.options.cellIsSquare ? this.columnWidth : this.options.rowHeight)) + 'px;border-width:' + this.options.cellBorderWidth + 'px;">';
	  if (i==0 || j==0) {
        html += (j==0 ? '<span class="ffgRowLabel">' : '') + ((i==0 && j!=0) ? '<span class="ffgColumnLabel">' : '') + this._data[i][j] + '</span>';
	  } else {
		diam = Math.round(minDiam + (((this._data[i][j] - this.minValue)/(this.maxValue - this.minValue)) * (maxDiam - minDiam)));
	    html += '<div style="width:' + diam + 'px;height:' + diam + 'px;border-radius:' + Math.round(diam / 2) + 'px;border:1px solid black;margin:auto;"></div>';	  
	  }
      html += '</div>';
	}
	html += '</div>';
  }
  html += '</div>';
  
  this.element.html(html);
  
  return this;
}

