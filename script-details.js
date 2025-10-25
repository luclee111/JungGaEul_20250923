// GSAP 애니메이션 (기존 코드)
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach(section => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// 페이지 로드 시 및 창 크기 변경 시, 실제 뷰포트 높이를 CSS 변수로 설정합니다.
function setVh() {
  // window.innerHeight는 툴바 등을 제외한 실제 뷰포트 높이입니다.
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");

  // 스크롤 이벤트 처리
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // 메뉴 활성화 처리 (예: 클릭 시 active 클래스 추가)
  const menuItems = document.querySelectorAll(".menu-item a");
  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      menuItems.forEach(link => link.parentElement.classList.remove("active"));
      this.parentElement.classList.add("active");
    });
  });
});

// HTML, body의 스크롤 설정
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.scrollBehavior = 'smooth'; // 부드러운 스크롤
    document.body.style.overscrollBehavior = 'contain'; // 스크롤 튐 방지
});

window.onload = function() {
  // 헤더 요소들의 애니메이션 활성화 (기존 opacity: 0 문제 해결)
  document.querySelectorAll('header > *').forEach(function(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // 풀스크린 메뉴 관련
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const fullscreenMenu = document.querySelector(".fullscreen-menu");
  const menuClose = document.querySelector('.menu-close');
  const fullscreenLinks = document.querySelectorAll('.fullscreen-menu .nav-link');

  // 햄버거 버튼 클릭 시 풀스크린 메뉴 활성화
 hamburgerMenu.addEventListener('click', () => {
    fullscreenMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 잠금
  });

  // 닫기 버튼 클릭 시 풀스크린 메뉴 비활성화
  menuClose.addEventListener('click', () => {
    fullscreenMenu.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 잠금 해제
  });

  // 풀스크린 메뉴 링크 클릭 시 메뉴 닫기
  fullscreenLinks.forEach(link => {
    link.addEventListener('click', () => {
      fullscreenMenu.classList.remove('active');
      document.body.style.overflow = ''; // 스크롤 잠금 해제
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // 현재 페이지의 상세 섹션 ID 확인
  let detailSectionId = '';
  if (document.getElementById('birth-chart-detail')) {
    detailSectionId = 'birth-chart-detail';
  } else if (document.getElementById('daewoon-detail')) {
    detailSectionId = 'daewoon-detail';
  } else if (document.getElementById('sewoon-detail')) {
    detailSectionId = 'sewoon-detail';
  }
  
  // 상세 섹션이 있는 경우에만 애니메이션 적용
  if (detailSectionId) {
    // 화면 크기에 맞게 초기 레이아웃 조정
    function adjustLayout() {
      const heroSection = document.getElementById('hero');
      const detailSection = document.getElementById(detailSectionId);
      const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
      
      // hero 섹션은 화면 전체 높이로
      heroSection.style.height = '100vh';
      
      // detail 섹션의 첫 요소들(h3, highlight-text)이 화면 하단에 위치하도록 패딩 조정
      const titleElement = detailSection.querySelector('h3');
      const highlightElement = detailSection.querySelector('.highlight-text');
      
      if (titleElement && highlightElement) {
        // 제목과 하이라이트 텍스트의 총 높이 계산
        const titleHeight = titleElement.offsetHeight;
        const highlightHeight = highlightElement.offsetHeight;
        const totalHeight = titleHeight + highlightHeight + 30; // 30px은 여백용
        
        // 화면 하단에 위치하도록 패딩 계산 (헤더 높이 고려)
        const windowHeight = window.innerHeight;
        const paddingTop = windowHeight - totalHeight - headerHeight;
        
        // 최소 패딩 보장
        detailSection.style.paddingTop = `${Math.max(50, paddingTop)}px`;
      }
    }
    
    // 페이지 로드 및 리사이즈 시 조정
    window.addEventListener('load', adjustLayout);
    window.addEventListener('resize', adjustLayout);
    
    // 초기 실행
    adjustLayout();
  }
});

// GSAP 애니메이션
gsap.registerPlugin(ScrollTrigger);

// 현재 페이지에 있는 상세 섹션 ID 확인 (GSAP 애니메이션 부분용)
let currentDetailSectionId = '';
if (document.getElementById('birth-chart-detail')) {
  currentDetailSectionId = 'birth-chart-detail';
} else if (document.getElementById('daewoon-detail')) {
  currentDetailSectionId = 'daewoon-detail';
} else if (document.getElementById('sewoon-detail')) {
  currentDetailSectionId = 'sewoon-detail';
}

// 상세 섹션이 있는 경우에만 애니메이션 적용
if (currentDetailSectionId) {
  // 1. Hero 페이드아웃 - 스크롤 시작하자마자 빠르게
  gsap.to("#hero", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "+=5", // 5px 스크롤하면 완전히 사라짐
      scrub: 1.5,
    },
    opacity: 0,
    ease: "power2.out"
  });

  // 2. 상세 섹션 전체의 배경 트랜지션
  gsap.fromTo(`#${currentDetailSectionId}`, 
    {
      backgroundColor: "rgba(245, 244, 241, 0)", // #f5f4f1 투명 배경
      visibility: "visible" // 먼저 보이게 설정
    },
    {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=5",
        scrub: 1.5,
      },
      backgroundColor: "rgba(245, 244, 241, 1)", // #f5f4f1 완전 불투명 배경
      ease: "sine.inOut"
    }
  );

  // 3. 상세 섹션의 제목과 하이라이트 텍스트 먼저 나타나기
  gsap.fromTo(`#${currentDetailSectionId} h3, #${currentDetailSectionId} .highlight-text`,
    {
      opacity: 0,
      y: 30
    },
    {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=5",
        scrub: 1.5,
      },
      opacity: 1,
      y: 0,
      stagger: 0.2, // 제목이 먼저, 하이라이트가 조금 뒤에
      ease: "power2.out"
    }
  );

  // 4. 나머지 본문 내용은 제목과 하이라이트 다음에 등장
  gsap.fromTo(`#${currentDetailSectionId} p:not(.highlight-text), #${currentDetailSectionId} ul, #${currentDetailSectionId} .detail-btn`,
    {
      opacity: 0,
      y: 20
    },
    {
      scrollTrigger: {
        trigger: `#${currentDetailSectionId} h3`,
        start: "top 80%", // 제목이 화면 상단 80% 위치에 오면 시작
        end: "+=400",
        scrub: 1.5,
      },
      opacity: 1,
      y: 0,
      stagger: 0.15, // 단락별로 순차적으로 등장
      ease: "power2.out"
    }
  );
}
