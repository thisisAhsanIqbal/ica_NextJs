'use client'

export default function OfflinePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#F9F6F4',
      color: '#333',
    }}>
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '1rem',
        color: '#CFADD1',
      }}>
        You&apos;re Offline
      </h1>
      <p style={{
        fontSize: '1.125rem',
        marginBottom: '2rem',
        maxWidth: '500px',
      }}>
        It looks like you&apos;re not connected to the internet. Please check your connection and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#CFADD1',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#B89BC3'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#CFADD1'
        }}
      >
        Try Again
      </button>
    </div>
  )
}

