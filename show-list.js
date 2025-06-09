
// 取得學生自治組織清單
async function fetchOrgs() {
    try {
        // 發送 GET 請求到 API
        const response = await fetch('organizations.json');
        
        // 檢查請求是否成功
        if (!response.ok) {
            throw new Error('網路請求失敗，請重試');
        }

        // 解析 JSON 格式的回應並返回結果
        const orgs = await response.json();
        return orgs;  // 返回解析後的陣列

    } catch (error) {
        // 錯誤處理
        console.error('錯誤:', error);
        return [];  // 在錯誤時返回空陣列
    }
}

// 列出法規
async function displayRegulations() {
    const orgs = await fetchOrgs();  // 獲取並處理學生自治組織清單
    
    // 取得 div 元素
    const regulationsDiv = document.getElementById('regulation-list');
    
    // 將陣列轉換為 HTML 列表形式
    if (orgs.length > 0) {
        // 使用 map() 方法來生成每個陣列項目的 HTML
        const listItems = orgs.map(org => `<li>${org}</li>`).join('');
        regulationsDiv.innerHTML = `<ul>${listItems}</ul>`;  // 插入到 div 中
    } else {
        regulationsDiv.innerHTML = '<p>目前沒有學生自治組織資料。</p>';
    }
}

// 調用 displayRegulations 函數來顯示資料
displayRegulations();
