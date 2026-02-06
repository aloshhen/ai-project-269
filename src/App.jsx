import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'

// ============ UTILITY FUNCTIONS ============
const cn = (...inputs) => inputs.filter(Boolean).join(' ')

// ============ SAFE ICON COMPONENT ============
const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const iconMap = {
    'shopping-bag': 'ShoppingBag',
    'menu': 'Menu',
    'x': 'X',
    'search': 'Search',
    'user': 'User',
    'heart': 'Heart',
    'star': 'Star',
    'star-half': 'StarHalf',
    'filter': 'Filter',
    'chevron-down': 'ChevronDown',
    'chevron-up': 'ChevronUp',
    'chevron-left': 'ChevronLeft',
    'chevron-right': 'ChevronRight',
    'plus': 'Plus',
    'minus': 'Minus',
    'trash-2': 'Trash2',
    'truck': 'Truck',
    'package': 'Package',
    'shield-check': 'ShieldCheck',
    'credit-card': 'CreditCard',
    'gift': 'Gift',
    'percent': 'Percent',
    'check': 'Check',
    'arrow-right': 'ArrowRight',
    'arrow-left': 'ArrowLeft',
    'map-pin': 'MapPin',
    'phone': 'Phone',
    'mail': 'Mail',
    'clock': 'Clock',
    'instagram': 'Instagram',
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'send': 'Send',
    'message-circle': 'MessageCircle',
    'sparkles': 'Sparkles',
    'award': 'Award',
    'gem': 'Gem',
    'crown': 'Crown',
    'palette': 'Palette',
    'ruler': 'Ruler',
    'tags': 'Tags',
    'thumbs-up': 'ThumbsUp',
    'image': 'Image',
    'camera': 'Camera'
  }

  const iconName = iconMap[name] || name
  const style = color ? { color } : {}

  const iconSvg = {
    'ShoppingBag': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    ),
    'Menu': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    ),
    'X': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    ),
    'Search': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    ),
    'User': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
    'Heart': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    ),
    'Star': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={name === 'star-fill' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    'StarFill': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    'Filter': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
    ),
    'ChevronDown': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m6 9 6 6 6-6"/></svg>
    ),
    'ChevronUp': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m18 15-6-6-6 6"/></svg>
    ),
    'ChevronLeft': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m15 18-6-6 6-6"/></svg>
    ),
    'ChevronRight': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m9 18 6-6-6-6"/></svg>
    ),
    'Plus': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    ),
    'Minus': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M5 12h14"/></svg>
    ),
    'Trash2': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
    ),
    'Truck': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
    ),
    'Package': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
    ),
    'ShieldCheck': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
    ),
    'CreditCard': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
    ),
    'Gift': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.5 2.5v5"/><path d="M16.5 8v-2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5h-5"/></svg>
    ),
    'Percent': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
    ),
    'Check': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M20 6 9 17l-5-5"/></svg>
    ),
    'ArrowRight': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    ),
    'ArrowLeft': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
    ),
    'MapPin': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    'Phone': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    ),
    'Mail': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ),
    'Clock': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    'Instagram': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    ),
    'Facebook': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    ),
    'Twitter': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
    ),
    'Send': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>
    ),
    'MessageCircle': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
    ),
    'Sparkles': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
    ),
    'Award': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
    ),
    'Gem': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
    ),
    'Crown': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
    ),
    'Palette': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    ),
    'Ruler': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>
    ),
    'Tags': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z"/><path d="M6 9.01V9"/><path d="m15 5 6.3 6.29a2.4 2.4 0 0 1 0 3.42l-3.58 3.58a2.4 2.4 0 0 1-3.42 0L8 16.8"/></svg>
    ),
    'ThumbsUp': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
    ),
    'Image': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    ),
    'Camera': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
    ),
    'Bot': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    )
  }

  return iconSvg[iconName] || (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
  )
}

// ============ PRODUCT DATA ============
const PRODUCTS = [
  {
    id: 1,
    name: 'Классические чёрные',
    category: 'men',
    price: 890,
    originalPrice: 1290,
    sizes: ['M', 'L', 'XL'],
    colors: ['black'],
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=80',
    rating: 4.9,
    reviews: 128,
    isPremium: true,
    description: 'Премиум хлопок 100%, египетский длинноволокнистый. Идеальная посадка и комфорт на весь день.'
  },
  {
    id: 2,
    name: 'Бизнес серые',
    category: 'men',
    price: 790,
    sizes: ['M', 'L', 'XL'],
    colors: ['gray'],
    image: 'https://images.unsplash.com/photo-1616567214738-22b4b983e3ae?w=600&q=80',
    rating: 4.7,
    reviews: 89,
    description: 'Строгий стиль для деловых встреч. Мерсеризованный хлопок с добавлением лайкры.'
  },
  {
    id: 3,
    name: 'Тёмно-синие элит',
    category: 'men',
    price: 1090,
    originalPrice: 1590,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['navy'],
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80',
    rating: 4.8,
    reviews: 156,
    isPremium: true,
    description: 'Глубокий синий цвет, не выцветает. Двойная усиленная пятка и носок.'
  },
  {
    id: 4,
    name: 'Королевские бордовые',
    category: 'men',
    price: 990,
    sizes: ['M', 'L'],
    colors: ['wine'],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80',
    rating: 4.6,
    reviews: 67,
    description: 'Насыщенный бордовый оттенок для уверенных в себе мужчин.'
  },
  {
    id: 5,
    name: 'Элегантные кремовые',
    category: 'women',
    price: 790,
    originalPrice: 1090,
    sizes: ['S', 'M'],
    colors: ['cream'],
    image: 'https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=600&q=80',
    rating: 4.9,
    reviews: 203,
    isPremium: true,
    description: 'Нежный кремовый оттенок. Тонкий, но прочный материал. Идеально под туфли.'
  },
  {
    id: 6,
    name: 'Розовая пудра',
    category: 'women',
    price: 690,
    sizes: ['S', 'M', 'L'],
    colors: ['pink'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    rating: 4.7,
    reviews: 145,
    description: 'Мягкий пудровый розовый. Дышащий материал, антибактериальная обработка.'
  },
  {
    id: 7,
    name: 'Чёрная классика',
    category: 'women',
    price: 790,
    sizes: ['S', 'M', 'L'],
    colors: ['black'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    rating: 4.8,
    reviews: 178,
    isPremium: true,
    description: 'Универсальный чёрный цвет. Уплотнённая стопа для комфорта.'
  },
  {
    id: 8,
    name: 'Пастель лаванда',
    category: 'women',
    price: 690,
    sizes: ['S', 'M'],
    colors: ['purple'],
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&q=80',
    rating: 4.5,
    reviews: 92,
    description: 'Нежный лавандовый оттенок. Органический хлопок, гипоаллергенно.'
  },
  {
    id: 9,
    name: 'Детские медвежата',
    category: 'kids',
    price: 490,
    originalPrice: 690,
    sizes: ['S', 'M'],
    colors: ['brown', 'cream'],
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80',
    rating: 4.9,
    reviews: 234,
    description: 'Милый принт с мишками. Безопасные красители, мягкая резинка.'
  },
  {
    id: 10,
    name: 'Динозаврики',
    category: 'kids',
    price: 490,
    sizes: ['S', 'M', 'L'],
    colors: ['green', 'yellow'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    rating: 4.8,
    reviews: 189,
    description: 'Яркие динозавры. Усиленные пятка и носок для активных детей.'
  },
  {
    id: 11,
    name: 'Звёздочки',
    category: 'kids',
    price: 450,
    sizes: ['S', 'M'],
    colors: ['navy', 'gold'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
    rating: 4.7,
    reviews: 156,
    isPremium: true,
    description: 'Золотые звёзды на тёмно-синем. Люминесцентные элементы для безопасности.'
  },
  {
    id: 12,
    name: 'Радужные полоски',
    category: 'kids',
    price: 450,
    sizes: ['S', 'M', 'L'],
    colors: ['multi'],
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
    rating: 4.6,
    reviews: 112,
    description: 'Весёлые разноцветные полоски. Не скатываются после стирки.'
  }
]

const REVIEWS = [
  {
    id: 1,
    name: 'Александр М.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    date: '2 недели назад',
    text: 'Отличное качество! Носки действительно не скатываются после множества стирок. Закажу ещё.',
    product: 'Классические чёрные',
    photo: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&q=80'
  },
  {
    id: 2,
    name: 'Елена В.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    date: 'месяц назад',
    text: 'Наконец-то нашла идеальные носки! Нежные, не давят, цвет точно как на фото.',
    product: 'Элегантные кремовые',
    photo: 'https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=200&q=80'
  },
  {
    id: 3,
    name: 'Михаил К.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 4,
    date: '3 недели назад',
    text: 'Хорошие носки, плотные. Но цвет чуть темнее, чем ожидал. В целом доволен.',
    product: 'Тёмно-синие элит'
  },
  {
    id: 4,
    name: 'Анна П.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    date: '2 месяца назад',
    text: 'Сын в восторге от динозавриков! Качество отличное, не растягиваются.',
    product: 'Динозаврики',
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80'
  }
]

const PROMO_CODES = {
  'WELCOME15': { discount: 0.15, type: 'percent' },
  'SOCKS2024': { discount: 500, type: 'fixed' },
  'PREMIUM': { discount: 0.2, type: 'percent' }
}

const DELIVERY_OPTIONS = [
  { id: 'courier', name: 'Курьерская доставка', price: 350, time: '1-2 дня' },
  { id: 'pickup', name: 'Самовывоз из магазина', price: 0, time: 'сегодня' },
  { id: 'post', name: 'Почта России', price: 250, time: '3-7 дней' }
]

// ============ HOOKS ============
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Что-то пошло не так')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Ошибка сети. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }

  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

// ============ COMPONENTS ============
const StarRating = ({ rating, size = 16 }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <SafeIcon
          key={i}
          name={i < fullStars ? 'star-fill' : i === fullStars && hasHalfStar ? 'star-half' : 'star'}
          size={size}
          className={i < fullStars ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="card-elegant group relative bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isPremium && (
            <span className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1">
              PREMIUM
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="absolute inset-0 bg-navy-900/40 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={onQuickView}
            className="bg-white text-navy-900 px-6 py-3 font-medium hover:bg-gold-500 hover:text-navy-900 transition-colors"
          >
            Быстрый просмотр
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-lg font-semibold text-navy-900 line-clamp-1">
            {product.name}
          </h3>
          <button className="text-navy-300 hover:text-red-500 transition-colors">
            <SafeIcon name="heart" size={20} />
          </button>
        </div>

        <p className="text-sm text-navy-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-navy-400">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-navy-900">{product.price} ₽</span>
            {product.originalPrice && (
              <span className="text-sm text-navy-400 line-through">{product.originalPrice} ₽</span>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="bg-navy-900 text-white p-2.5 hover:bg-gold-500 hover:text-navy-900 transition-colors"
          >
            <SafeIcon name="plus" size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const CartSidebar = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) => {
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_OPTIONS[0])

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = appliedPromo
    ? appliedPromo.type === 'percent'
      ? subtotal * appliedPromo.discount
      : appliedPromo.discount
    : 0
  const deliveryCost = subtotal >= 3000 ? 0 : selectedDelivery.price
  const total = subtotal - discount + deliveryCost

  const applyPromo = () => {
    const code = promoCode.toUpperCase()
    if (PROMO_CODES[code]) {
      setAppliedPromo({ ...PROMO_CODES[code], code })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-navy-900/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-navy-100">
              <h2 className="font-serif text-2xl font-bold text-navy-900">
                Корзина ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-navy-50 transition-colors">
                <SafeIcon name="x" size={24} className="text-navy-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <SafeIcon name="shopping-bag" size={64} className="text-navy-200 mx-auto mb-4" />
                  <p className="text-navy-500 text-lg">Корзина пуста</p>
                  <button
                    onClick={onClose}
                    className="mt-4 text-gold-600 font-medium hover:underline"
                  >
                    Перейти к покупкам
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-cream-50">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-navy-900">{item.product.name}</h4>
                        <p className="text-sm text-navy-500">Размер: {item.size}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-navy-200 hover:border-navy-400"
                            >
                              <SafeIcon name="minus" size={14} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-navy-200 hover:border-navy-400"
                            >
                              <SafeIcon name="plus" size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-navy-900">
                            {item.product.price * item.quantity} ₽
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-navy-400 hover:text-red-500"
                      >
                        <SafeIcon name="trash-2" size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code */}
              {cart.length > 0 && (
                <div className="mt-6 pt-6 border-t border-navy-100">
                  <p className="font-medium text-navy-900 mb-2">Промокод</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите код"
                      className="flex-1 px-4 py-2 border border-navy-200 focus:border-navy-500 outline-none uppercase"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 bg-navy-900 text-white hover:bg-navy-800"
                    >
                      Применить
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                      <SafeIcon name="check" size={16} />
                      Промокод {appliedPromo.code} применён!
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Options */}
              {cart.length > 0 && (
                <div className="mt-6 pt-6 border-t border-navy-100">
                  <p className="font-medium text-navy-900 mb-3">Способ доставки</p>
                  <div className="space-y-2">
                    {DELIVERY_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        className={cn(
                          'flex items-center gap-3 p-3 border cursor-pointer transition-colors',
                          selectedDelivery.id === option.id
                            ? 'border-navy-900 bg-navy-50'
                            : 'border-navy-200 hover:border-navy-400'
                        )}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={selectedDelivery.id === option.id}
                          onChange={() => setSelectedDelivery(option)}
                          className="accent-navy-900"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-navy-900">{option.name}</p>
                          <p className="text-sm text-navy-500">{option.time}</p>
                        </div>
                        <span className="font-medium text-navy-900">
                          {option.price === 0 ? 'Бесплатно' : `${option.price} ₽`}
                        </span>
                      </label>
                    ))}
                  </div>
                  {subtotal >= 3000 && (
                    <p className="mt-2 text-sm text-green-600">
                      <SafeIcon name="gift" size={14} className="inline mr-1" />
                      Бесплатная доставка при заказе от 3000 ₽
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-navy-100 bg-cream-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-navy-600">
                    <span>Подытог</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка</span>
                      <span>-{Math.round(discount)} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-navy-600">
                    <span>Доставка</span>
                    <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-navy-900 pt-2 border-t border-navy-200">
                    <span>Итого</span>
                    <span>{Math.round(total)} ₽</span>
                  </div>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-gold-500 text-navy-900 py-4 font-bold text-lg hover:bg-gold-400 transition-colors"
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M')
  const [activeTab, setActiveTab] = useState('description')

  if (!product) return null

  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 3)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-navy-900/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white transition-colors"
            >
              <SafeIcon name="x" size={24} className="text-navy-900" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="bg-cream-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>

              {/* Info */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  {product.isPremium && (
                    <span className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1">
                      PREMIUM
                    </span>
                  )}
                  <span className="text-navy-400 text-sm uppercase tracking-wider">
                    {product.category === 'men' ? 'Мужские' : product.category === 'women' ? 'Женские' : 'Детские'}
                  </span>
                </div>

                <h2 className="font-serif text-3xl font-bold text-navy-900 mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={product.rating} />
                  <span className="text-navy-500 text-sm">({product.reviews} отзывов)</span>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-navy-900">{product.price} ₽</span>
                  {product.originalPrice && (
                    <span className="text-xl text-navy-400 line-through">{product.originalPrice} ₽</span>
                  )}
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="font-medium text-navy-900 mb-3">Размер</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          'w-12 h-12 font-medium transition-colors',
                          selectedSize === size
                            ? 'bg-navy-900 text-white'
                            : 'bg-white border border-navy-200 text-navy-700 hover:border-navy-400'
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCart(product, selectedSize)
                    onClose()
                  }}
                  className="w-full bg-navy-900 text-white py-4 font-bold text-lg hover:bg-gold-500 hover:text-navy-900 transition-colors mb-6"
                >
                  Добавить в корзину
                </button>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-navy-100">
                  <div className="text-center">
                    <SafeIcon name="shield-check" size={24} className="text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-navy-600">Гарантия качества</p>
                  </div>
                  <div className="text-center">
                    <SafeIcon name="truck" size={24} className="text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-navy-600">Быстрая доставка</p>
                  </div>
                  <div className="text-center">
                    <SafeIcon name="package" size={24} className="text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-navy-600">Премиум упаковка</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6">
                  <div className="flex border-b border-navy-200">
                    {['description', 'reviews'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'px-4 py-3 font-medium text-sm transition-colors',
                          activeTab === tab
                            ? 'text-navy-900 border-b-2 border-navy-900'
                            : 'text-navy-500 hover:text-navy-700'
                        )}
                      >
                        {tab === 'description' ? 'Описание' : 'Отзывы'}
                      </button>
                    ))}
                  </div>

                  <div className="py-4">
                    {activeTab === 'description' ? (
                      <p className="text-navy-600 leading-relaxed">{product.description}</p>
                    ) : (
                      <div className="space-y-4">
                        {REVIEWS.filter(r => r.product === product.name).map((review) => (
                          <div key={review.id} className="pb-4 border-b border-navy-100 last:border-0">
                            <div className="flex items-center gap-3 mb-2">
                              <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                              <div>
                                <p className="font-medium text-navy-900">{review.name}</p>
                                <p className="text-xs text-navy-400">{review.date}</p>
                              </div>
                            </div>
                            <StarRating rating={review.rating} size={12} />
                            <p className="text-navy-600 text-sm mt-2">{review.text}</p>
                            {review.photo && (
                              <img src={review.photo} alt="Фото отзыва" className="mt-2 w-20 h-20 object-cover rounded" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="p-8 bg-cream-50 border-t border-navy-100">
              <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">Рекомендуем также</h3>
              <div className="grid grid-cols-3 gap-4">
                {relatedProducts.map((p) => (
                  <div key={p.id} className="bg-white p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => { onClose(); setTimeout(() => window.location.reload(), 100) }}>
                    <img src={p.image} alt={p.name} className="w-full aspect-square object-cover mb-3" />
                    <p className="font-medium text-navy-900 text-sm">{p.name}</p>
                    <p className="text-gold-600 font-bold">{p.price} ₽</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Здравствуйте! Чем могу помочь?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const FAQ_DATA = [
    {
      question: 'Как выбрать размер?',
      answer: 'Размеры соответствуют стандартной таблице: S (35-37), M (38-40), L (41-43), XL (44-46). Детские: S (26-29), M (30-33), L (34-36).',
      keywords: ['размер', 'какой размер', 'подобрать размер', 'таблица размеров']
    },
    {
      question: 'Сколько стоит доставка?',
      answer: 'Курьерская доставка — 350 ₽, Почта России — 250 ₽, самовывоз бесплатно. При заказе от 3000 ₽ доставка бесплатная!',
      keywords: ['доставка', 'сколько стоит', 'стоимость доставки', 'бесплатная доставка']
    },
    {
      question: 'Какие материалы?',
      answer: 'Наши носки изготовлены из премиального египетского хлопка (80-95%), с добавлением эластана и полиамида для эластичности.',
      keywords: ['материал', 'из чего', 'хлопок', 'состав', 'ткань']
    },
    {
      question: 'Есть ли скидки?',
      answer: 'Да! Используйте промокод WELCOME15 для скидки 15% на первый заказ. Также следите за акциями.',
      keywords: ['скидка', 'промокод', 'акция', 'дешевле', 'со скидкой']
    },
    {
      question: 'Как вернуть товар?',
      answer: 'Возврат возможен в течение 14 дней. Товар должен быть не надетым, с сохранёнными бирками и упаковкой.',
      keywords: ['возврат', 'вернуть', 'обмен', 'отказаться']
    }
  ]

  const SITE_CONTEXT = 'SockStyle — интернет-магазин премиальных носков. Ассортимент: мужские, женские, детские носки. Цены от 450 до 1090 рублей. Доставка по России. Премиальные материалы: египетский хлопок, мерсеризация.'

  const findFAQAnswer = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase()
    for (const faq of FAQ_DATA) {
      if (faq.keywords.some(k => lowerMsg.includes(k))) {
        return faq.answer
      }
    }
    return null
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setInput('')
    setIsTyping(true)

    // Check FAQ first
    const faqAnswer = findFAQAnswer(userMessage)

    if (faqAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: faqAnswer }])
        setIsTyping(false)
      }, 800)
    } else {
      // Fallback to "AI" simulation
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Спасибо за вопрос! Наш менеджер скоро свяжется с вами. А пока можете посмотреть раздел FAQ или напишите на почту support@sockstyle.ru'
        }])
        setIsTyping(false)
      }, 1200)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-navy-900 text-white p-4 rounded-full shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <SafeIcon name="message-circle" size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-navy-900/30 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
            >
              {/* Header */}
              <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                    <SafeIcon name="bot" size={20} className="text-navy-900" />
                  </div>
                  <div>
                    <p className="font-bold">Помощник SockStyle</p>
                    <p className="text-xs text-navy-300">Обычно отвечает за минуту</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                  <SafeIcon name="x" size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'max-w-[80%] p-3 rounded-2xl text-sm',
                      msg.type === 'user'
                        ? 'bg-navy-900 text-white ml-auto rounded-br-md'
                        : 'bg-cream-100 text-navy-900 rounded-bl-md'
                    )}
                  >
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="bg-cream-100 text-navy-900 rounded-2xl rounded-bl-md p-3 max-w-[60%]">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-navy-100 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-2 bg-cream-50 rounded-full text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-gold-500 text-navy-900 rounded-full flex items-center justify-center hover:bg-gold-400 transition-colors"
                >
                  <SafeIcon name="send" size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ============ MAIN APP ============
function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = activeCategory === 'all' || product.category === activeCategory
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(s => product.sizes.includes(s))
      const colorMatch = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c))
      return categoryMatch && sizeMatch && colorMatch
    })
  }, [activeCategory, selectedSizes, selectedColors])

  // Recommendations based on viewed category
  const recommendations = useMemo(() => {
    const category = activeCategory === 'all' ? 'men' : activeCategory
    return PRODUCTS.filter(p => p.category === category).slice(0, 4)
  }, [activeCategory])

  const addToCart = (product, size) => {
    const cartItem = {
      id: Date.now(),
      product,
      size,
      quantity: 1
    }
    setCart(prev => [...prev, cartItem])
    setIsCartOpen(true)
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-40 border-b border-navy-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <SafeIcon name="crown" size={28} className="text-gold-500" />
              <span className="font-serif text-xl md:text-2xl font-bold text-navy-900">SockStyle</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { id: 'catalog', label: 'Каталог' },
                { id: 'about', label: 'О нас' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'contact', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-navy-600 hover:text-navy-900 font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden md:flex p-2 text-navy-600 hover:text-navy-900">
                <SafeIcon name="search" size={22} />
              </button>
              <button className="hidden md:flex p-2 text-navy-600 hover:text-navy-900">
                <SafeIcon name="user" size={22} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-navy-600 hover:text-navy-900"
              >
                <SafeIcon name="shopping-bag" size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-navy-900 text-xs font-bold rounded-full flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 text-navy-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <SafeIcon name={isMobileMenuOpen ? 'x' : 'menu'} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-navy-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <nav className="p-4 space-y-3">
                {[
                  { id: 'catalog', label: 'Каталог' },
                  { id: 'about', label: 'О нас' },
                  { id: 'reviews', label: 'Отзывы' },
                  { id: 'contact', label: 'Контакты' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-2 text-navy-700 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582966772680-860e372bb558?w=1920&q=80"
            alt="Премиальные носки"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <SafeIcon name="gem" size={20} className="text-gold-500" />
              <span className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium">
                Премиум качество
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Элитные носки<br />
              <span className="text-gold-400">для тех, кто ценит</span>
            </h1>
            <p className="text-lg md:text-xl text-navy-100 mb-8 max-w-lg leading-relaxed">
              Ручная работа, египетский хлопок, безупречная посадка.
              Ощутите комфорт премиум-класса каждый день.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('catalog')}
                className="btn-gold text-center"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-medium border border-white/30 hover:bg-white/20 transition-colors text-center"
              >
                Узнать больше
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <SafeIcon name="chevron-down" size={32} />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: 'award', title: 'Премиум качество', desc: 'Египетский хлопок' },
              { icon: 'truck', title: 'Быстрая доставка', desc: '1-2 дня по Москве' },
              { icon: 'shield-check', title: 'Гарантия 1 год', desc: 'На все изделия' },
              { icon: 'gift', title: 'Подарочная упаковка', desc: 'Бесплатно' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <SafeIcon name={feature.icon} size={40} className="text-gold-500 mx-auto mb-3" />
                <h3 className="font-medium text-navy-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-navy-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Каталог
            </h2>
            <p className="text-navy-500 max-w-2xl mx-auto">
              Выберите идеальную пару из нашей коллекции премиальных носков
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'Все' },
              { id: 'men', label: 'Мужские' },
              { id: 'women', label: 'Женские' },
              { id: 'kids', label: 'Детские' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-6 py-2.5 font-medium transition-colors',
                  activeCategory === cat.id
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-navy-700 border border-navy-200 hover:border-navy-400'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white p-6 border border-navy-100 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <SafeIcon name="filter" size={20} className="text-navy-600" />
                  <h3 className="font-bold text-navy-900">Фильтры</h3>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-navy-900 mb-3 flex items-center gap-2">
                    <SafeIcon name="ruler" size={16} />
                    Размер
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={cn(
                          'w-10 h-10 text-sm font-medium transition-colors',
                          selectedSizes.includes(size)
                            ? 'bg-navy-900 text-white'
                            : 'bg-cream-50 text-navy-700 border border-navy-200 hover:border-navy-400'
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-navy-900 mb-3 flex items-center gap-2">
                    <SafeIcon name="palette" size={16} />
                    Цвет
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'black', label: 'Чёрный', bg: 'bg-gray-900' },
                      { id: 'gray', label: 'Серый', bg: 'bg-gray-500' },
                      { id: 'navy', label: 'Синий', bg: 'bg-blue-900' },
                      { id: 'cream', label: 'Кремовый', bg: 'bg-amber-100' },
                      { id: 'pink', label: 'Розовый', bg: 'bg-pink-300' }
                    ].map((color) => (
                      <button
                        key={color.id}
                        onClick={() => toggleColor(color.id)}
                        title={color.label}
                        className={cn(
                          'w-8 h-8 rounded-full border-2 transition-all',
                          color.bg,
                          selectedColors.includes(color.id)
                            ? 'border-gold-500 ring-2 ring-gold-200 scale-110'
                            : 'border-white shadow-md hover:scale-110'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                  <button
                    onClick={() => { setSelectedSizes([]); setSelectedColors([]) }}
                    className="text-sm text-navy-500 hover:text-navy-900 underline"
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="text-navy-500 mb-4">Найдено: {filteredProducts.length} товаров</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product, product.sizes[0])}
                    onQuickView={() => setQuickViewProduct(product)}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <SafeIcon name="search" size={64} className="text-navy-200 mx-auto mb-4" />
                  <p className="text-navy-500 text-lg">Товары не найдены</p>
                  <p className="text-navy-400">Попробуйте изменить фильтры</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="py-20 bg-navy-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Рекомендуем
              </h2>
              <p className="text-navy-300">Популярные модели этой категории</p>
            </div>
            <button
              onClick={() => scrollToSection('catalog')}
              className="hidden md:flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
            >
              Смотреть всё
              <SafeIcon name="arrow-right" size={20} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product, idx) => (
              <motion.div
                key={product.id}
                className="bg-white group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setQuickViewProduct(product)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-navy-900 mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gold-600">{product.price} ₽</span>
                    <StarRating rating={product.rating} size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <SafeIcon name="sparkles" size={20} className="text-gold-500" />
                <span className="text-gold-600 text-sm uppercase tracking-wider font-medium">О бренде</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy-900 mb-6">
                SockStyle —<br />
                <span className="text-gold-600">искусство комфорта</span>
              </h2>
              <div className="space-y-4 text-navy-600 leading-relaxed">
                <p>
                  Мы верим, что носки — это не просто аксессуар, а важная деталь образа,
                  которая может подчеркнуть статус и вкус своего владельца.
                </p>
                <p>
                  Каждая пара создаётся вручную из отборного египетского хлопка с
                  длинным волокном. Мы используем только натуральные красители и
                  технологию мерсеризации для придания ткани шелковистого блеска.
                </p>
                <p>
                  Наши мастера с опытом более 20 лет контролируют каждый этап производства,
                  чтобы вы получили изделие, которое прослужит годы, сохраняя идеальную форму.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-navy-200">
                <div>
                  <p className="text-3xl font-bold text-navy-900">15+</p>
                  <p className="text-sm text-navy-500">лет на рынке</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-navy-900">50K+</p>
                  <p className="text-sm text-navy-500">довольных клиентов</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-navy-900">100%</p>
                  <p className="text-sm text-navy-500">натуральный хлопок</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="Производство носков"
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl">
                <SafeIcon name="award" size={40} className="text-gold-500 mb-2" />
                <p className="font-bold text-navy-900">Лучший бренд 2024</p>
                <p className="text-sm text-navy-500">По версии Fashion Awards</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-cream-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-navy-500">Что говорят о нас те, кто уже выбрал SockStyle</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={review.id}
                className="bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-navy-900">{review.name}</p>
                    <p className="text-xs text-navy-400">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-navy-600 mt-3 text-sm leading-relaxed">{review.text}</p>
                <p className="text-xs text-gold-600 mt-3">Купил: {review.product}</p>
                {review.photo && (
                  <img
                    src={review.photo}
                    alt="Фото отзыва"
                    className="mt-3 w-full h-32 object-cover rounded"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-navy-500">
              Остались вопросы? Мы всегда рады помочь вам с выбором
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="map-pin" size={24} className="text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">Адрес</h3>
                  <p className="text-navy-600">Москва, ул. Тверская, 15<br />ТЦ «Модный сезон», 3 этаж</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="phone" size={24} className="text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">Телефон</h3>
                  <p className="text-navy-600">+7 (495) 123-45-67<br />Ежедневно с 10:00 до 22:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="mail" size={24} className="text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">Email</h3>
                  <p className="text-navy-600">info@sockstyle.ru<br />support@sockstyle.ru</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="clock" size={24} className="text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">Режим работы</h3>
                  <p className="text-navy-600">Пн–Пт: 10:00 – 22:00<br />Сб–Вс: 11:00 – 21:00</p>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-4 pt-4">
                {['instagram', 'facebook', 'twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors"
                  >
                    <SafeIcon name={social} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SafeIcon name="crown" size={24} className="text-gold-500" />
                <span className="font-serif text-xl font-bold">SockStyle</span>
              </div>
              <p className="text-navy-300 text-sm leading-relaxed">
                Премиальные носки ручной работы из египетского хлопка.
                Комфорт и стиль для тех, кто ценит качество.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><button onClick={() => { setActiveCategory('men'); scrollToSection('catalog') }} className="hover:text-white">Мужские носки</button></li>
                <li><button onClick={() => { setActiveCategory('women'); scrollToSection('catalog') }} className="hover:text-white">Женские носки</button></li>
                <li><button onClick={() => { setActiveCategory('kids'); scrollToSection('catalog') }} className="hover:text-white">Детские носки</button></li>
                <li><button onClick={() => scrollToSection('catalog')} className="hover:text-white">Новинки</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><a href="#" className="hover:text-white">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-white">Возврат и обмен</a></li>
                <li><a href="#" className="hover:text-white">Размерная таблица</a></li>
                <li><a href="#" className="hover:text-white">Уход за изделиями</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Подписка</h4>
              <p className="text-navy-300 text-sm mb-4">Получайте новости и специальные предложения</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-2 bg-navy-800 border border-navy-700 text-white placeholder-navy-400 focus:outline-none focus:border-gold-500"
                />
                <button className="bg-gold-500 text-navy-900 px-4 hover:bg-gold-400 transition-colors">
                  <SafeIcon name="arrow-right" size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy-400 text-sm">© 2024 SockStyle. Все права защищены.</p>
            <div className="flex gap-6 text-navy-400 text-sm">
              <a href="#" className="hover:text-white">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white">Публичная оферта</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => alert('Оформление заказа — интеграция с платёжной системой')}
      />

      {/* Product Modal */}
      <ProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

// Contact Form Component
const ContactForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // Replace with your Web3Forms Access Key from https://web3forms.com

  return (
    <div className="bg-white p-8 border border-navy-100">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="input-elegant"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Ваш email"
                required
                className="input-elegant"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                rows="4"
                required
                className="input-elegant resize-none"
              ></textarea>
            </div>

            {isError && (
              <div className="text-red-500 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy-900 text-white py-4 font-bold hover:bg-gold-500 hover:text-navy-900 transition-colors disabled:bg-navy-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <SafeIcon name="send" size={18} />
                  Отправить сообщение
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-center py-12"
          >
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon name="check" size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">
              Сообщение отправлено!
            </h3>
            <p className="text-navy-500 mb-8">
              Спасибо за обращение. Мы ответим вам в ближайшее время.
            </p>
            <button
              onClick={resetForm}
              className="text-gold-600 font-semibold hover:text-gold-700 transition-colors"
            >
              Отправить ещё сообщение
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App