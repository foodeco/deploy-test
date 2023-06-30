import { FormEvent, useState, useEffect, ChangeEvent, useCallback, useRef } from "react";
import "./UserInfo.scss";
import { InfoToken } from "@/Apis/register";
import Category from "./common/components/Category";


function UserInfo() {

  const [displayName, setDisplayName] = useState("");
  const [profileImgBase64, setProfileImgBase64] = useState<string>("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function submit(e: any) {
    e.preventDefault();
    try {
      if (!displayName || !profileImgBase64 || !oldPassword || !newPassword) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      await InfoToken(displayName, profileImgBase64, oldPassword, newPassword)
      alert("수정 완료");
      window.location.reload();
    } catch (err) {
      console.error("error");
      alert("수정 실패");
      window.location.reload(); 
    }
  }

  // const UploadImage = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files as FileList;
  //   for (const file of files) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (reader.result) {
  //         setProfileImgBase64(reader.result as string);
  //         setFileSize(file.size);
  //         if (file.size > 1 * 1024 * 1024) {
  //           alert("파일 용량은 1MB를 초과할 수 없습니다.");
  //         }
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeInBytes = file.size;
      const maxSizeInBytes = 1 * 1024 * 1024;

      if (fileSizeInBytes > maxSizeInBytes) {
        alert("파일 용량은 1MB를 초과할 수 없습니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="UserInfo-AllLayout">
        <div className="UserInfo-AllLayout__center">
          <div className="LeftContainer">
            <Category/>
          </div>
          <div className="RightContainer">
          <div className="infoContainer">
              <div className="info">
                <div className="infoTag">
                  <div className="infoText">회원정보 수정</div>
                </div>
                <div className="infoBox">
                  <form onSubmit={submit}>
                    <div className="infoList">
                        <div className="infoTitle">기존 비밀번호</div>
                        <div className="infoItem">
                          <input
                            className="infoItemForm"
                            placeholder="비밀번호를 입력해주세요"
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="infoList">
                        <div className="infoTitle">새 비밀번호</div>
                          <div className="infoItem">
                            <input
                              className="infoItemForm"
                              placeholder="비밀번호를 입력해주세요"
                              type="password"
                              name="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                          </div>
                      </div>
                      <div className="infoList">
                        <div className="infoTitle">닉네임 변경</div>
                          <div className="infoItem">
                            <input
                              className="infoItemForm"
                              placeholder="닉네임을 입력해주세요"
                              type="text"
                              name="disPlayname"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              required
                            />
                          </div>
                      </div>
                      <div className="infoImage-container">
                        <div className="infoImage-container__text">프로필 이미지</div>
                          <div className="infoImageUpload"> 
                            <label htmlFor="file" className="custom-file-input">
                              <span>파일 업로드</span>
                            <input  
                              type="file"
                              id="file"
                              name="file"
                              accept="image/*"
                              //onChange={UploadImage}
                              onChange={handleImageChange}
                            />
                            </label>
                          </div>
                          <span className="fileMB">파일 용량은 1MB를 초과할 수 없습니다.</span>

                          <div className="preview-container">
                            {selectedImage ? (
                              <img src={selectedImage} alt="Preview" />
                            ) : (
                              <span>이미지 미리보기</span>
                            )}
                          </div>
                          
                      </div>

                      <div className="infoList">
                        <div className="infoItem">
                          <button 
                            className="infoFix"
                            type="submit"> 회원 정보 수정
                          </button>
                        </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>
    </>
  );
}

export default UserInfo;
