import Helper from 'helpers/miscHelpers'

/**
 * NOTE: We use _meta as constructor argument in order to make new instances of the object from plain objects
 * and use validations with setters but keep plain object in redux store
 */
class Base {
    constructor({ _name = '', _ipfs = '', txTime = Date.now(), _meta = {} } = {}) {
        let name = _name || _meta.fullName || ''
        this.name = name
        this._ipfs = _ipfs

        this._meta = {}

        this.fullName = _meta.fullName || _name
        this.txTime = _meta.txTime || txTime
        this.createdOn = _meta.createdOn || txTime
        this.modifiedOn = _meta.modifiedOn || txTime

    }

    get name() { return this._name }
    set name(value) { this._name = Helper.slugify(value) }

    get ipfs() { return this._ipfs }
    set ipfs(value) { this._ipfs = value }

    get fullName() { return this._meta.fullName }
    set fullName(value) { this._meta.fullName = value }

    get txTime() { return this._meta.txTime }
    set txTime(value) { this._meta.txTime = value }

    get createdOn() { return this._meta.createdOn }
    set createdOn(value) { this._meta.createdOn = value }

    get modifiedOn() { return this._meta.modifiedOn }
    set modifiedOn(value) { this._meta.modifiedOn = value }

    get meta() { return this._meta }
    // Can we change all meta or validate each with setter ?
    // set meta(value) { this._meta = value }  

    plainObj() {
        return { ...this }
    }

    static getImgUrl = img => {
        // TODO: GET ipfs gateway from some config!!!
        if (!img) return null
        if (img.url) return img.url
        if (img.ipfs) return `http://localhost:8080/ipfs/${img.ipfs}`
        if (img.type && img.type_id) {
            switch (img.type) {
                case 'ipfs':
                    return `http://localhost:8080/ipfs/${img.type_id}`
                default: return ''
            }
        }
        if (typeof img === 'string') {
            return img
        }
        // TEMP
        if (img.tempUrl) {
            return img.tempUrl
        }
    }

    static updateObject({ item = {}, ownProps = { key: null, value: null }, meta = {}, objModel = Base, dirtyProps } = {}) {

        let newItem = new objModel(item)

        let hasDirtyProps = Array.isArray(dirtyProps)
        if (hasDirtyProps) dirtyProps = [...dirtyProps]

        // TODO: Handle remove key value
        for (let key in meta) {
            if (meta.hasOwnProperty(key) && newItem._meta.hasOwnProperty(key)) {

                let value = meta[key]

                if (value instanceof Date) {
                    value = value.getTime()
                }

                newItem[key] = value

                if (hasDirtyProps && dirtyProps.indexOf(key) < 0) {
                    dirtyProps.push(key)
                }
            }
        }

        // TODO: update no meta props

        newItem.modifiedOn = Date.now()

        newItem.dirtyProps = dirtyProps

        let plainObj = newItem.plainObj()

        return plainObj
    }

    static updateMeta(item, meta, dirtyProps) {
        let newItem = { ...item }
        let newMeta = { ...newItem._meta }
        let hasDirtyProps = Array.isArray(dirtyProps)
        if (hasDirtyProps) dirtyProps = [...dirtyProps]

        // TODO: Handle remove key value
        for (let key in meta) {
            if (meta.hasOwnProperty(key) && newMeta.hasOwnProperty(key)) {

                let value = meta[key] //|| newMeta[key]

                if (value instanceof Date) {
                    value = value.getTime()
                }

                newMeta[key] = value

                if (hasDirtyProps && dirtyProps.indexOf(key) < 0) {
                    dirtyProps.push(key)
                }
            }
        }

        newItem.dirtyProps = dirtyProps
        newItem._meta = newMeta

        console.log('mewmata', newMeta)

        return newItem
    }
}

export default Base
