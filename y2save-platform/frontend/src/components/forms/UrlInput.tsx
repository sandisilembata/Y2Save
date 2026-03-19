'use client'

import { useState, FormEvent } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { validateUrl } from '@/lib/utils'

const urlSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
})

type UrlInputProps = {
  onSubmit: (url: string) => Promise<void>
  loading?: boolean
  error?: string | null
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, loading = false, error }) => {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
  })

  const onFormSubmit = handleSubmit(async (data) => {
    setSubmitError(null)
    try {
      if (!validateUrl(data.url)) {
        setSubmitError('Invalid URL format')
        return
      }
      await onSubmit(data.url)
      reset()
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to process URL')
    }
  })

  return (
    <div className="w-full">
      {(error || submitError) && (
        <Alert 
          type="error" 
          message={error || submitError || ''} 
          onClose={() => setSubmitError(null)}
        />
      )}
      <form onSubmit={onFormSubmit} className="flex gap-2">
        <Controller
          name="url"
          control={control}
          render={({ field, fieldState: { error: fieldError } }) => (
            <div className="flex-1">
              <Input
                {...field}
                placeholder="Paste video URL here..."
                type="url"
                disabled={loading}
                error={fieldError?.message}
              />
            </div>
          )}
        />
        <Button type="submit" loading={loading} className="whitespace-nowrap">
          Download
        </Button>
      </form>
    </div>
  )
}
