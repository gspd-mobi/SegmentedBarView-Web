function Segment (config) {
    this.color = config.color;
    this.minValue = config.minValue;
    this.maxValue = config.maxValue;
    this.includeLeft = config.includeLeft || false;
    this.includeRight = config.includeRight || false;
    this.text = config.text || '';
    this.descriptionText = config.descriptionText || null;
}