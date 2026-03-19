'use client'

export const AdBanner: React.FC = () => {
  return (
    <div className="bg-gray-100 py-4 text-center">
      <p className="text-sm text-gray-600">
        Advertisement Space
        <br />
        <span className="text-xs">Ad Network ID: {process.env.NEXT_PUBLIC_AD_NETWORK_ID || 'Not configured'}</span>
      </p>
    </div>
  )
}
