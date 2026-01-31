// Quick debug script to test API endpoints
const API_BASE = "https://api.tipsmega888.com";

async function testStarClaimAPI() {
    console.log("Testing Star Claim API...\n");

    // Get token and deviceId from localStorage (manual input needed)
    const token = "PASTE_USER_TOKEN_HERE";
    const deviceId = "PASTE_DEVICE_ID_HERE";

    if (!token || !deviceId || token.includes("PASTE")) {
        console.log("❌ Please edit this script and add:");
        console.log("   1. User's JWT token from localStorage.getItem('tipsmega_auth_token')");
        console.log("   2. DeviceId from localStorage.getItem('tipsmega_device_id')");
        return;
    }

    try {
        // Test 1: Check Pending
        console.log("1️⃣ Testing /api/auth/check-pending");
        const checkRes = await fetch(`${API_BASE}/api/auth/check-pending`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("   Status:", checkRes.status);
        const checkData = await checkRes.json();
        console.log("   Response:", JSON.stringify(checkData, null, 2));

        // Test 2: Grant Device
        if (checkData.pending > 0) {
            console.log("\n2️⃣ Testing /api/auth/grant-device");
            const grantRes = await fetch(`${API_BASE}/api/auth/grant-device`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ deviceId })
            });

            console.log("   Status:", grantRes.status);
            const grantData = await grantRes.json();
            console.log("   Response:", JSON.stringify(grantData, null, 2));
        } else {
            console.log("\n2️⃣ Skipping grant-device (no pending stars)");
        }

        console.log("\n✅ API Test Complete!");
    } catch (error) {
        console.error("\n❌ Error:", error.message);
        console.error("   Full error:", error);
    }
}

// Run test
testStarClaimAPI();
