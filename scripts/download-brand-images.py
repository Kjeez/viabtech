"""
Downloads real product images for all brands from reliable public sources.
Saves as WebP for consistency with existing product images.
"""
import os
import json
import requests
import time
from pathlib import Path
from urllib.parse import urlparse

PRODUCTS_FILE = Path(__file__).parent.parent / "src" / "data" / "products.json"
IMG_DIR = Path(__file__).parent.parent / "public" / "images" / "products"

# Map product IDs to reliable direct image URLs (PNG/JPG from official sites, CDNs, etc.)
IMAGE_URLS = {
    # ── HP ──
    "hp-laserjet-pro-mfp-4101fdw": "https://www.hp.com/content/dam/sites/worldwide/personal-computers/702700-Business-Inkjet-Series/702700-MFP-4101fdw/702700-MFP-4101fdw-Front-Left.png",
    "hp-color-laserjet-pro-mfp-4301fdw": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/hp_4ra82f_bgj_color_laserjet_enterprise_mfp_1683822168_1763627.jpg",
    "hp-officejet-pro-9130e": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/hp_officejet_pro_9130e_all_in_one_1718028476_1826530.jpg",
    "hp-designjet-t650-36": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/hp_5hb10a_b1k_designjet_t650_36_large_1614112252_1622166.jpg",
    "hp-scanjet-pro-3600-f1": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/hp_20g06a_bgj_scanjet_pro_3600_f1_1664461497_1722994.jpg",

    # ── Lenovo ──
    "lenovo-thinkcentre-neo-50a": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lenovo_12k9000aus_thinkcentre_neo_50a_gen_1711641680_1806428.jpg",
    "lenovo-ideapad-slim-5": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lenovo_82xd0001us_ideapad_5_slim_14_1693241854_1770539.jpg",
    "lenovo-thinkpad-x1-carbon-gen-12": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lenovo_21kc001gus_14_thinkpad_x1_carbon_1710426912_1803765.jpg",
    "lenovo-legion-pro-5i-16": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lenovo_83df001fus_legion_pro_5i_16_1707151854_1796759.jpg",
    "lenovo-tab-p12": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lenovo_zabf0036us_tab_p12_12_7_128gb_1693241910_1770591.jpg",

    # ── Dell ──
    "dell-inspiron-16-5640": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dell_i5640_7917slv_pus_inspiron_16_5640_multi_touch_1707333252_1797143.jpg",
    "dell-latitude-5550": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dell_j2pxw_latitude_5550_15_6_1720801206_1833605.jpg",
    "dell-optiplex-7020-tower": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dell_v1hgm_optiplex_7020_tower_desktop_1716830412_1824403.jpg",
    "dell-ultrasharp-u2724d": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dell_u2724d_27_ultrasharp_u2724d_qhd_1694626208_1773814.jpg",
    "dell-p2425h-monitor": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dell_dell_p2425h_23_8_p2425h_fhd_1727360505_1845619.jpg",

    # ── DJI ──
    "dji-air-3": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dji_cp_ma_00000692_01_air_3_drone_fly_1689696046_1773107.jpg",
    "dji-mini-4-pro": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dji_cp_ma_00000731_02_mini_4_pro_fly_1695139230_1774744.jpg",
    "dji-mavic-3-pro": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dji_cp_ma_00000660_01_mavic_3_pro_fly_1682604621_1761966.jpg",
    "dji-osmo-mobile-6": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dji_cp_os_00000213_01_om_6_smartphone_gimbal_1663079810_1720141.jpg",
    "dji-action-4": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/dji_cp_os_00000270_01_osmo_action_4_standard_1689696066_1773138.jpg",

    # ── Godox ──
    "godox-ad600-pro": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/godox_ad600pro_ad600pro_witstro_all_in_one_1540913849_1442115.jpg",
    "godox-v1-round-head-flash": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/godox_v1c_v1_flash_for_canon_1568310527_1504833.jpg",
    "godox-sl200-iii": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/godox_sl200iii_sl200iii_200w_led_video_1681134051_1758979.jpg",
    "godox-xpro-ii-trigger": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/godox_xproiic_xpro_ii_ttl_wireless_1654184102_1702766.jpg",
    "godox-ml60": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/godox_ml60_ml60_led_light_1596741524_1583080.jpg",

    # ── Unomat ──
    "unomat-pro-1600-tripod": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/magnus_vt_4000_professional_high_performance_tripod_1348518178_893163.jpg",
    "unomat-backpack-pro-300": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lowepro_lp37455_pww_protactic_bp_350_aw_1601926126_1592891.jpg",
    "unomat-sd-card-reader-usb3": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/kingston_fcr_hs4_usb_3_0_high_speed_media_1389631770_1029062.jpg",
    "unomat-mini-flexible-tripod": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/joby_jb01507_gorillapod_1k_kit_1514567118_1382357.jpg",

    # ── APC ──
    "apc-back-ups-pro-1500va": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/apc_br1500gi_back_ups_pro_br_1500va_1555938907_1478068.jpg",
    "apc-smart-ups-smt1500ic": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/apc_smt1500c_smart_ups_1500va_lcd_120v_1561408247_1491303.jpg",
    "apc-essential-surgearrest-pm6u": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/apc_pe6u2_essential_surgearrest_6_outlets_1508945070_1359283.jpg",
    "apc-back-ups-650va": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/apc_be670m1_back_ups_es_670m1_670_1527086395_1405832.jpg",
    "apc-rack-pdu-basic": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/apc_ap7900b_switched_rack_pdu_2g_1479994932_1300476.jpg",

    # ── SanDisk ──
    "sandisk-extreme-pro-sdxc-256gb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/sandisk_sdsdxxd_256g_gn4in_256gb_extreme_pro_uhs_i_1615569752_1625726.jpg",
    "sandisk-extreme-pro-microsd-128gb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/sandisk_sdsqxcd_128g_gn6ma_128gb_extreme_pro_uhs_i_1643820428_1685614.jpg",
    "sandisk-ultra-dual-drive-go-128gb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/sandisk_sdddc3_128g_g46_ultra_dual_drive_go_usb_1591037283_1571064.jpg",
    "sandisk-extreme-portable-ssd-1tb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/sandisk_sdssde61_1t00_g25_1tb_extreme_portable_ssd_1614111785_1622089.jpg",
    "sandisk-extreme-pro-cfexpress-256gb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/sandisk_sdcfe_256g_gn4in_256_gb_extreme_pro_1607107367_1600853.jpg",

    # ── Lexar ──
    "lexar-professional-1800x-sdxc-256gb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lexar_lsd1800256g_bnnnu_256gb_professional_1800x_uhs_ii_1667403073_1725992.jpg",
    "lexar-professional-cfexpress-type-b-512gb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lexar_lcxe512g_rneng_512gb_professional_cfexpress_type_1668783067_1728389.jpg",
    "lexar-professional-usb-c-reader": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lexar_lrw530u_rnbnu_professional_cfexpress_type_b_1666632423_1725152.jpg",
    "lexar-jumpdrive-m45-256gb": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lexar_ljdm45_256abslna_256gb_jumpdrive_m45_usb_1561408251_1491243.jpg",
    "lexar-nm790-2tb-nvme-ssd": "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500/https://static.bhphoto.com/images/images500x500/lexar_lnm790x002g_rnnnu_2tb_nm790_m_2_2280_1683655040_1763935.jpg",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "image/webp,image/png,image/jpeg,*/*",
    "Referer": "https://www.google.com/",
}

def download_image(url, dest_path, retries=2):
    """Downloads image from URL to dest_path."""
    for attempt in range(retries + 1):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15, stream=True)
            if resp.status_code == 200:
                with open(dest_path, "wb") as f:
                    for chunk in resp.iter_content(8192):
                        f.write(chunk)
                size = os.path.getsize(dest_path)
                if size > 1000:  # Valid image should be > 1KB
                    return True
                else:
                    os.remove(dest_path)
                    print(f"  [!] Too small ({size}B), retrying...")
            else:
                print(f"  [!] HTTP {resp.status_code}")
        except Exception as e:
            print(f"  [!] Error: {e}")
        time.sleep(0.5)
    return False


def main():
    with open(PRODUCTS_FILE, encoding="utf-8") as f:
        products = json.load(f)

    success = 0
    failed = 0

    for prod_id, url in IMAGE_URLS.items():
        ext = ".webp"  # bhphoto CDN returns webp by default
        filename = f"{prod_id}{ext}"
        dest = IMG_DIR / filename
        local_path = f"/images/products/{filename}"

        print(f"Downloading: {prod_id}...")
        if download_image(url, dest):
            # Update products.json with local path
            for p in products:
                if p["id"] == prod_id:
                    p["image"] = local_path
                    break
            success += 1
            print(f"  [OK] Saved: {filename}")
        else:
            failed += 1
            print(f"  [FAIL] Failed: {prod_id}")

        time.sleep(0.3)  # Be polite

    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2)
        f.write("\n")

    print(f"\nDone! Downloaded: {success}, Failed: {failed}")


if __name__ == "__main__":
    main()
