'use client'

import 'leaflet/dist/leaflet.css';
import styles from './page.module.css'
import dynamic from 'next/dynamic'

export default function Home() {

    const Map = dynamic(() => import("@/src/components/map"), { ssr: false })

    return (
        <main className={styles.main}>
            <Map/>
        </main>
    )
}
