import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="pt-[40px] px-[40px] pb-[60px] text-center">
            <div>
                <Link
                    className="text-color-white-20 decoration-color-white-20 hover:underline"
                    to="${repository}"
                >
                    GitHub Repository
                </Link>
            </div>
            <div>
                <Link
                    className="text-color-white-20 hover:underline"
                    to="${github}"
                >
                    {new Date().getFullYear()} KangDaeLyeol
                </Link>
            </div>
        </div>
    )
}
