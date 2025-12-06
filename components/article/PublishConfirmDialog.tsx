'use client'

import { AlertTriangle, X, Send } from 'lucide-react'

interface PublishConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  isPublishing: boolean
}

export default function PublishConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  isPublishing,
}: PublishConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="dialog-icon">
          <Send size={32} />
        </div>

        <h2 className="dialog-title">Ready to Publish?</h2>

        <div className="dialog-body">
          <p className="article-title">&ldquo;{title || 'Untitled Article'}&rdquo;</p>
          <p className="dialog-message">
            Once published, your article will be visible to all users. You can
            still edit it after publishing.
          </p>
        </div>

        <div className="dialog-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onClose}
            disabled={isPublishing}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-publish"
            onClick={onConfirm}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <>
                <div className="loading-spinner"></div>
                Publishing...
              </>
            ) : (
              <>
                <Send size={18} />
                Publish Article
              </>
            )}
          </button>
        </div>

        <style jsx>{`
          .dialog-overlay {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 1000;
            padding: 20px;
          }

          .dialog-content {
            position: relative;
            width: 100%;
            max-width: 420px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          }

          .close-button {
            position: absolute;
            top: 16px;
            right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: transparent;
            border: none;
            border-radius: 6px;
            color: var(--muted-foreground);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .close-button:hover {
            background: var(--muted);
            color: var(--foreground);
          }

          .dialog-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            margin: 0 auto 20px;
            background: rgba(var(--primary-rgb), 0.1);
            color: var(--primary);
            border-radius: 50%;
          }

          .dialog-title {
            margin: 0 0 16px;
            font-size: 22px;
            font-weight: 600;
            text-align: center;
            color: var(--foreground);
          }

          .dialog-body {
            text-align: center;
            margin-bottom: 24px;
          }

          .article-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--foreground);
            margin: 0 0 12px;
            word-break: break-word;
          }

          .dialog-message {
            font-size: 14px;
            color: var(--muted-foreground);
            line-height: 1.6;
            margin: 0;
          }

          .dialog-actions {
            display: flex;
            gap: 12px;
          }

          .btn-cancel,
          .btn-publish {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 20px;
            font-size: 15px;
            font-weight: 500;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-cancel {
            background: var(--muted);
            color: var(--foreground);
            border: 1px solid var(--border);
          }

          .btn-cancel:hover:not(:disabled) {
            background: var(--background);
          }

          .btn-publish {
            background: var(--primary);
            color: white;
            border: none;
          }

          .btn-publish:hover:not(:disabled) {
            opacity: 0.9;
            transform: translateY(-1px);
          }

          .btn-cancel:disabled,
          .btn-publish:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .loading-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 480px) {
            .dialog-content {
              padding: 24px;
            }

            .dialog-actions {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
