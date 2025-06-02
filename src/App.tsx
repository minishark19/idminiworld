import { useState } from 'react';
import './App.css';
import './footer.css';
import './social-icons.css';
import './tab-styles.css';
import { Tabs, TabsContent } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Search, Sparkles, Leaf, Palette, Package, Backpack, Box, Star } from "lucide-react";

// Import data
import allItems from './data/All_id.json';
import sinhVat from './data/sinh_vat.json';
import khac from './data/khac.json';
import skin from './data/skin.json';
import vatPham from './data/vat_pham.json';
import thanThu from './data/than_thu.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name'); // 'name' or 'id'
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Handle tab change - reset search state
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    let results: any[] = [];
    let dataSource: any[] = [];

    // Determine which data source to use based on active tab
    switch (activeTab) {
      case 'all':
        dataSource = allItems;
        break;
      case 'items':
        dataSource = vatPham;
        break;
      case 'creatures':
        dataSource = sinhVat;
        break;
      case 'skins':
        dataSource = skin;
        break;
      case 'than_thu':
        dataSource = thanThu;
        break;
      case 'others':
        dataSource = khac;
        break;
      default:
        dataSource = allItems;
    }

    // Search by name or ID
    if (searchType === 'name') {
      results = dataSource.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Search by ID
      results = dataSource.filter(item => 
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setSearchResults(results);
  };

  // Get background color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'all':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'items':
        return 'bg-gradient-to-r from-red-400 to-rose-500';
      case 'creatures':
        return 'bg-gradient-to-r from-green-400 to-teal-500';
      case 'skins':
        return 'bg-gradient-to-r from-orange-400 to-amber-500';
      case 'than_thu':
        return 'bg-gradient-to-r from-cyan-400 to-blue-500';
      case 'others':
        return 'bg-gradient-to-r from-blue-400 to-indigo-500';
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
    }
  };

  // Get card color based on index for variety
  const getCardColor = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300',
      'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300',
      'bg-gradient-to-br from-green-100 to-green-200 border-green-300',
      'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300',
      'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300',
      'bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-300',
      'bg-gradient-to-br from-red-100 to-red-200 border-red-300',
      'bg-gradient-to-br from-teal-100 to-teal-200 border-teal-300',
      'bg-gradient-to-br from-cyan-100 to-cyan-200 border-cyan-300',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <header className={`py-6 px-4 ${getCategoryColor(activeTab)} text-white shadow-lg`}>
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8" />
            Mini World ID Finder
          </h1>
          <p className="mt-2 text-white/80">Tìm kiếm ID và thông tin vật phẩm trong Mini World</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Custom Tabs List */}
          <div className="custom-tabs-list">
            <div 
              className={`tab-item all ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Tất cả</span>
            </div>
            <div 
              className={`tab-item items ${activeTab === 'items' ? 'active' : ''}`}
              onClick={() => handleTabChange('items')}
            >
              <Backpack className="h-4 w-4" />
              <span className="hidden sm:inline">Vật phẩm</span>
            </div>
            <div 
              className={`tab-item creatures ${activeTab === 'creatures' ? 'active' : ''}`}
              onClick={() => handleTabChange('creatures')}
            >
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Sinh vật</span>
            </div>
            <div 
              className={`tab-item than_thu ${activeTab === 'than_thu' ? 'active' : ''}`}
              onClick={() => handleTabChange('than_thu')}
            >
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Thần Thú</span>
            </div>
            <div 
              className={`tab-item skins ${activeTab === 'skins' ? 'active' : ''}`}
              onClick={() => handleTabChange('skins')}
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Skin</span>
            </div>
            <div 
              className={`tab-item others ${activeTab === 'others' ? 'active' : ''}`}
              onClick={() => handleTabChange('others')}
            >
              <Box className="h-4 w-4" />
              <span className="hidden sm:inline">Khác</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder={searchType === 'name' ? "Nhập tên để tìm ID..." : "Nhập ID để tìm tên..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSearchType(searchType === 'name' ? 'id' : 'name')}
                className="whitespace-nowrap"
              >
                Tìm {searchType === 'name' ? 'ID' : 'Tên'}
              </Button>
              <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Package className="h-6 w-6 mr-2" />
              Tất cả vật phẩm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <Card key={item.id} className={`overflow-hidden border-2 ${getCardColor(index)} card-hover-effect`}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>ID: {item.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Loại: Tất cả</p>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && searchTerm && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="items" className="mt-0">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Backpack className="h-6 w-6 mr-2" />
              Vật phẩm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <Card key={item.id} className={`overflow-hidden border-2 ${getCardColor(index)} card-hover-effect`}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>ID: {item.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Loại: Vật phẩm</p>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && searchTerm && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="creatures" className="mt-0">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Leaf className="h-6 w-6 mr-2" />
              Sinh vật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <Card key={item.id} className={`overflow-hidden border-2 ${getCardColor(index)} card-hover-effect`}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>ID: {item.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Loại: Sinh vật</p>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && searchTerm && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="than_thu" className="mt-0">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Star className="h-6 w-6 mr-2" />
              Thần Thú
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <Card key={item.id} className={`overflow-hidden border-2 ${getCardColor(index)} card-hover-effect`}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>ID: {item.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-24 h-24 object-contain mb-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.png';
                        }}
                      />
                      <p>Cấp độ: {item.level}</p>
                      <p>Loại: Thần Thú</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && searchTerm && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="skins" className="mt-0">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Palette className="h-6 w-6 mr-2" />
              Skin
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <Card key={item.id} className={`overflow-hidden border-2 ${getCardColor(index)} card-hover-effect`}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>ID: {item.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Loại: Skin</p>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && searchTerm && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="others" className="mt-0">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Box className="h-6 w-6 mr-2" />
              Khác
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <Card key={item.id} className={`overflow-hidden border-2 ${getCardColor(index)} card-hover-effect`}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>ID: {item.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Loại: Khác</p>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && searchTerm && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="footer-container mt-auto">
        <div className="footer-left">
          <img src="/images/shark-logo.jpeg" alt="Mini Shark Logo" className="footer-logo" />
          <div>
            <h3 className="text-white font-bold">Chào cả Nhà IU Của</h3>
            <h3 className="text-white font-bold">Shark</h3>
          </div>
        </div>
        
        <div className="footer-center">
          <p className="footer-text">© Mini Shark - Mini World ID Finder</p>
        </div>
        
        <div className="footer-right">
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100092607253179" target="_blank" rel="noopener noreferrer">
              <div className="facebook-icon">
                <img src="/icons/facebook.png" alt="Facebook" width="24" height="24" />
              </div>
            </a>
            <a href="https://www.youtube.com/@minishark14" target="_blank" rel="noopener noreferrer">
              <div className="youtube-icon">
                <img src="/icons/youtube_fixed.png" alt="YouTube" width="24" height="24" />
              </div>
            </a>
          </div>
          <div className="donate-container">
            <span className="donate-text">Donate</span>
            <span className="donate-arrow">→</span>
            <img src="/images/qr-code.png" alt="Donate QR Code" className="qr-code" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
