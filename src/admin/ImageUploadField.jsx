import { useId, useState } from 'react'
import { uploadImage } from '../lib/uploadImage'

export default function ImageUploadField({
  id,
  label,
  value,
  onChange,
  hint,
}) {
  const inputId = useId()
  const fieldId = id || inputId
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const media = await uploadImage(file)
      onChange(media.url)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="admin-field">
      <label htmlFor={fieldId}>{label}</label>

      {value ? (
        <div className="admin-upload__preview">
          <img src={value} alt="" />
          <div className="admin-upload__preview-actions">
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => onChange('')}
              disabled={uploading}
            >
              Remove
            </button>
          </div>
        </div>
      ) : null}

      <div className="admin-upload__row">
        <label className="admin-upload__btn" htmlFor={`${fieldId}-file`}>
          {uploading ? 'Uploading…' : 'Select & upload image'}
        </label>
        <input
          id={`${fieldId}-file`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          hidden
        />
        <input
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL"
        />
      </div>

      {hint ? <p className="admin-form__hint">{hint}</p> : null}
      {error ? <p className="admin-form__error">{error}</p> : null}
    </div>
  )
}
