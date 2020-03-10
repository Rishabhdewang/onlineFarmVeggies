module.exports = {
  name: 'farmer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/farmer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
