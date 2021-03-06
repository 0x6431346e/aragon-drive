import React from 'react'
import fontawesome from '@fortawesome/fontawesome'
import mime from 'mime-types'
import * as solid from '@fortawesome/free-regular-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as fileDesc from './file-descriptions'

export function downloadFile(file, filename) {
  const mimeType = mime.lookup(getExtensionForFilename(filename).toLowerCase())
  const blob = new Blob([file], { type: mimeType })

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob)
    return
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = data
  link.download = filename
  document.body.appendChild(link);
  link.click()
  document.body.removeChild(link);

  // For Firefox it is necessary to delay revoking the ObjectURL
  setTimeout(() => window.URL.revokeObjectURL(data), 100)
}

export function convertFileToArrayBuffer(file) {
  return new Promise((res) => {
    const reader = new FileReader()

    reader.onload = () => {
      res(reader.result)
    }

    reader.readAsArrayBuffer(file)
  })
}

/**
 * @param {string} extension
 * @returns {string}
 */
export function getExtensionForFilename(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * @param {string} extension
 * @returns {string}
 */
export function getClassNameForFilename(filename) {
  const fileInfo = fileDesc.extensions[getExtensionForFilename(filename).toLowerCase()]

  return fileInfo
    ? fileInfo.className
    : fileDesc.classNames.file
}

export function getDescriptionForFilename(filename) {
  const fileInfo = fileDesc.extensions[getExtensionForFilename(filename).toLowerCase()]

  return fileInfo
    ? fileInfo.description
    : ''
}

export function getClassNameForFile(file) {
  return file.isFolder
    ? 'folder'
    : getClassNameForFilename(file.name)
}

export function getDescriptionForFile(file) {
  return file.isFolder
    ? 'Folder'
    : getDescriptionForFilename(file.name)
}

export function getIconForFile(file) {
  return file.isFolder
    ? <FontAwesomeIcon style={{ height: '20px', marginLeft: '-2px', verticalAlign: 'middle', marginBottom: '3px' }} icon={regular.faFolder} />
    : <FontAwesomeIcon icon={regular[getClassNameForFile(file)]} />
}

export function loadFileIcons() {
  for (const icon of fileDesc.fontAwesomeIcons)
    fontawesome.library.add(solid[icon])
}

export function getFileName(file) {
  return file.id === 0
    ? 'Home'
    : file.name
}