import { dbService } from '../services/dbService';

export function getOrCreateSessionId(): string {
  const SESSION_KEY = 'webbites_session_id';
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || (width >= 600 && width <= 1024)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua) || width < 600) {
    return 'mobile';
  }
  return 'desktop';
}

export function initVisitorTracking(): void {
  if (typeof window === 'undefined') return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const sourceParam = urlParams.get('source') || (document.referrer.includes('qr') ? 'ticket_qr' : 'direct');
    const sessionId = getOrCreateSessionId();
    const deviceType = detectDeviceType();
    const pagePath = window.location.pathname;

    // Log the visit only once per session or on path change
    const loggedKey = `webbites_logged_${sessionId}_${pagePath}`;
    if (!sessionStorage.getItem(loggedKey)) {
      sessionStorage.setItem(loggedKey, 'true');
      dbService.recordVisit({
        session_id: sessionId,
        source: sourceParam,
        device_type: deviceType,
        page_path: pagePath,
      });
    }
  } catch (err) {
    console.warn('Analytics tracking error:', err);
  }
}
