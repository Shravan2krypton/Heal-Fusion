import React, { useState, useEffect } from 'react'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      // Sample articles - replace with API call
      const sampleArticles = [
        {
          _id: '1',
          title: 'Understanding Hypertension: Causes, Symptoms & Management',
          category: 'Cardiovascular',
          excerpt: 'High blood pressure affects millions worldwide. Learn about the silent killer, its risk factors, lifestyle modifications, and treatment options to maintain heart health.',
          content: 'Hypertension, commonly known as high blood pressure, is a medical condition where the force of blood against artery walls is consistently too high...',
          emoji: '❤️',
          date: '2025-01-15',
          readTime: '5 min read',
          author: 'Dr. Sarah Johnson',
          tags: ['Heart Health', 'Blood Pressure', 'Cardiovascular']
        },
        {
          _id: '2',
          title: 'Complete Diabetes Management: From Diagnosis to Daily Care',
          category: 'Endocrine',
          excerpt: 'A comprehensive guide to managing diabetes effectively. Discover monitoring techniques, dietary recommendations, exercise plans, and medication management strategies.',
          content: 'Diabetes mellitus is a chronic metabolic disorder characterized by elevated blood glucose levels...',
          emoji: '💊',
          date: '2025-01-10',
          readTime: '8 min read',
          author: 'Dr. Michael Chen',
          tags: ['Diabetes', 'Blood Sugar', 'Endocrine']
        },
        {
          _id: '3',
          title: 'Respiratory Health: Exercise, Prevention & Lung Function',
          category: 'Respiratory',
          excerpt: 'Maintain healthy lungs and improve respiratory function through targeted exercises, breathing techniques, and lifestyle modifications for better lung health.',
          content: 'Respiratory health is crucial for overall well-being and athletic performance...',
          emoji: '💨',
          date: '2025-01-08',
          readTime: '6 min read',
          author: 'Dr. Emily Rodriguez',
          tags: ['Lungs', 'Breathing', 'Respiratory']
        },
        {
          _id: '4',
          title: 'Mental Health Awareness: Breaking Stigma & Building Wellness',
          category: 'Mental Health',
          excerpt: 'Understanding mental health conditions, recognizing warning signs, and learning coping strategies to maintain psychological well-being in our fast-paced world.',
          content: 'Mental health encompasses our emotional, psychological, and social well-being...',
          emoji: '🧠',
          date: '2025-01-05',
          readTime: '7 min read',
          author: 'Dr. David Park',
          tags: ['Mental Health', 'Wellness', 'Psychology']
        },
        {
          _id: '5',
          title: 'Nutrition for Optimal Health: Essential Nutrients & Diet Planning',
          category: 'Nutrition',
          excerpt: 'Discover the essential nutrients your body needs for optimal function. Learn about macronutrients, micronutrients, and how to create balanced meal plans.',
          content: 'Proper nutrition is the foundation of good health and disease prevention...',
          emoji: '🥗',
          date: '2024-12-28',
          readTime: '6 min read',
          author: 'Dr. Lisa Thompson',
          tags: ['Nutrition', 'Diet', 'Vitamins']
        },
        {
          _id: '6',
          title: 'Sleep Quality & Health: Science-Backed Improvement Strategies',
          category: 'Sleep',
          excerpt: 'Quality sleep is essential for physical and mental health. Learn evidence-based techniques to improve sleep hygiene, overcome insomnia, and optimize rest.',
          content: 'Sleep is a fundamental biological process essential for physical restoration, memory consolidation, and emotional regulation...',
          emoji: '😴',
          date: '2024-12-20',
          readTime: '5 min read',
          author: 'Dr. James Wilson',
          tags: ['Sleep', 'Insomnia', 'Rest']
        },
        {
          _id: '7',
          title: 'Cancer Prevention: Lifestyle Factors & Early Detection',
          category: 'Oncology',
          excerpt: 'Understanding cancer risk factors and implementing preventive measures. Learn about screening guidelines, lifestyle modifications, and early detection strategies.',
          content: 'Cancer prevention involves understanding risk factors and implementing protective measures...',
          emoji: '🎗️',
          date: '2024-12-15',
          readTime: '9 min read',
          author: 'Dr. Rachel Green',
          tags: ['Cancer', 'Prevention', 'Screening']
        },
        {
          _id: '8',
          title: 'Pediatric Health: Growth, Development & Common Concerns',
          category: 'Pediatrics',
          excerpt: 'Guide to child health, growth milestones, vaccination schedules, and addressing common pediatric health concerns from infancy through adolescence.',
          content: 'Pediatric health encompasses the physical, mental, and emotional well-being of children...',
          emoji: '👶',
          date: '2024-12-10',
          readTime: '7 min read',
          author: 'Dr. Amanda Foster',
          tags: ['Children', 'Growth', 'Pediatrics']
        }
      ]
      setArticles(sampleArticles)
      setFilteredArticles(sampleArticles)
    } catch (err) {
      console.error('Error loading articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    let filtered = articles

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    setFilteredArticles(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [searchTerm, selectedCategory])

  const categories = [...new Set(articles.map(a => a.category))]

  const openArticle = (article) => {
    setSelectedArticle(article)
  }

  const closeArticle = () => {
    setSelectedArticle(null)
  }

  return (
    <div className="articles-page">
      {/* Hero Section */}
      <div className="articles-hero">
        <div className="hero-content">
          <div className="hero-icon">📚</div>
          <h1 className="hero-title">Health Articles & Medical Insights</h1>
          <p className="hero-subtitle">
            Discover evidence-based health information, medical insights, and wellness tips from healthcare professionals.
            Stay informed about diseases, prevention, and healthy living practices.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{articles.length}</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-card card-1">🩺</div>
            <div className="floating-card card-2">💊</div>
            <div className="floating-card card-3">🧬</div>
            <div className="floating-card card-4">❤️</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="articles-controls">
        <div className="controls-container">
          <div className="search-section">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="filter-section">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="results-info">
            <span className="results-count">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading health articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No articles found</h3>
          <p>Try adjusting your search terms or browse all categories.</p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('')
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="articles-grid">
          {filteredArticles.map(article => (
            <div key={article._id} className="article-card" onClick={() => openArticle(article)}>
              <div className="article-header">
                <div className="article-icon">{article.emoji}</div>
                <div className="article-category">
                  <span className="category-badge">{article.category}</span>
                </div>
              </div>

              <div className="article-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-meta">
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    <span className="meta-text">{article.author}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span className="meta-text">{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span className="meta-text">{article.readTime}</span>
                  </div>
                </div>

                <div className="article-tags">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="article-footer">
                <button className="read-more-btn">
                  <span className="btn-text">Read Article</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={closeArticle}>
          <div className="article-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-category">
                <span className="category-badge">{selectedArticle.category}</span>
              </div>
              <button onClick={closeArticle} className="modal-close">×</button>
            </div>

            <div className="modal-content">
              <div className="article-hero">
                <div className="article-emoji">{selectedArticle.emoji}</div>
                <h2 className="article-full-title">{selectedArticle.title}</h2>
                <div className="article-byline">
                  <span className="author">By {selectedArticle.author}</span>
                  <span className="separator">•</span>
                  <span className="date">{new Date(selectedArticle.date).toLocaleDateString()}</span>
                  <span className="separator">•</span>
                  <span className="read-time">{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="article-body">
                <div className="article-intro">
                  <p>{selectedArticle.excerpt}</p>
                </div>

                <div className="article-full-content">
                  <p>{selectedArticle.content}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className="article-tags-section">
                  <h4>Related Topics:</h4>
                  <div className="tags-list">
                    {selectedArticle.tags.map(tag => (
                      <span key={tag} className="tag-large">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <div className="article-actions">
                  <button className="btn-secondary">
                    <span className="btn-icon">📖</span>
                    Save for Later
                  </button>
                  <button className="btn-secondary">
                    <span className="btn-icon">📤</span>
                    Share Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medical Disclaimer */}
      <div className="medical-disclaimer">
        <div className="disclaimer-content">
          <h3>🩺 Medical Disclaimer</h3>
          <p>The information provided in these articles is for educational purposes only and should not be considered medical advice. Always consult with qualified healthcare professionals for diagnosis and treatment. HealFusion is not responsible for any decisions made based on this information.</p>
        </div>
      </div>
    </div>
  )
}
