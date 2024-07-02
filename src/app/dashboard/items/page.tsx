"use client"
import ItemsPage from "@/components/dashboard/items/get-items";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import styles from "./items.module.css"

export default function Items () {
    return (    
        <div className={styles.dashboardContainer}>
        <div className="flex-none w-[200px]">
            <Sidebar />
        </div>
        <div className="flex-grow pl-10">
            <ItemsPage />
        </div>
    </div>
    )
}
 