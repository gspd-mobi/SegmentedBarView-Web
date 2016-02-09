function Segment (config) {
    this.color = config.color;
    this.minValue = config.minValue;
    this.maxValue = config.maxValue;
    this.includeLeft = config.includeLeft || false;
    this.includeRight = config.includeRight || false;
}