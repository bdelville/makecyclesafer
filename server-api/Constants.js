module.exports = class Constants {
  static get REPORT_TYPES() {
    return ['incident', 'hazard', 'thumbup'];
  }

  static get CRITICALITY() {
    return ['crash', 'nearmiss'];
  }

  static get WEATHER() {
    return ['rainy', 'sunny'];
  }

  static get MOVEMENT() {
    return ['turning', 'crossingNoTurn', 'crossingTurn', 'merging', 'sideSwipe', 'dooring', 'overtaking', 'rearEnd', 'driveway', 'other'];
  }

  static get INCIDENT_TYPE() {
    return ['cyclistOnly', 'cyclistVehicle', 'cyclistPedestrian'];
  }

  static get HAZARD_TYPE() {
    return ['pothole', 'glass', 'gravel', 'signs', 'vegetation', 'other'];
  }
};