'use client';

export default function TestEnvPage() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="space-y-2">
        <div>
          <strong>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:</strong>{' '}
          {cloudName || '❌ MISSING'}
        </div>
        <div>
          <strong>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:</strong>{' '}
          {uploadPreset || '❌ MISSING'}
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>All NEXT_PUBLIC env vars:</strong>
          <pre className="mt-2 text-xs">
            {JSON.stringify(
              Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')),
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
